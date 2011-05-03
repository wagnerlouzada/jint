﻿using System;
using System.Collections.Generic;
using System.Text;
using Jint.Delegates;

namespace Jint.Native {
    [Serializable]
    public class JsArguments : JsObject {
        public const string CALLEE = "callee";

        JsDescriptorReference m_lengthReference;
        IJsInstance[] m_arguments;

        public JsArguments(IGlobal global, JsFunction callee, Descriptor[] links, IJsInstance[] arguments, bool strict)
            : base(global.ObjectClass.PrototypeProperty)
        {
            if (length < 0)
                throw new ArgumentOutOfRangeException("length");
            if (global == null)
                throw new ArgumentNullException("global");
            if (callee == null)
                throw new ArgumentNullException("callee");
            
            if (arguments == null)
                arguments = new IJsInstance[0];

            m_arguments = arguments;

            ValueDescriptor lengthDescriptor = new ValueDescriptor(this, "length", global.NewPrimitive(arguments.Length)) { Enumerable = false };
            DefineOwnProperty(lengthDescriptor, true);
            
            m_lengthReference = new JsDescriptorReference(this, lengthDescriptor);

            // Add list of arguments
            if (links != null) {
                // bind to named arguments
                for (int i = 0; i < arguments.Length; i++)
                    if ( i < links.Length )
                        DefineOwnProperty(new LinkedDescriptor(this,i.ToString(),links[i],links[i].Owner),true);
                    else
                        DefineOwnProperty(i.ToString(), arguments[i].GetObject(), PropertyAttributes.None);
            } else {
                for (int i = 0; i < arguments.Length; i++)
                    DefineOwnProperty(i.ToString(), arguments[i].GetObject(), PropertyAttributes.None);
            }


            if (strict) {
                DefineOwnPropertyThrower(CALLEE);
                DefineOwnPropertyThrower("caller");
            } else {
                DefineOwnProperty(CALLEE, callee, PropertyAttributes.DontEnum);
            }

        }

        
        public override string Class {
            get { return CLASS_ARGUMENTS; }
        }
    }
}
