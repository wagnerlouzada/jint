﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using Jint.Delegates;

namespace Jint.Native {
    [Serializable]
    public sealed class JsString : JsObjectBase {

        string m_value;

        public override bool IsClr {
            get { return false; }
        }

        public override object Value {
            get {
                return m_value;
            }
            set {
                m_value = (string) value;
            }
        }

        public override string Class {
            get { return JsInstance.CLASS_STRING; }
        }
    }
}
