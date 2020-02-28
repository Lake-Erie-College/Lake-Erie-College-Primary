// Require in project typefaces for speed, per
// https://spectrum.chat/gatsby-js/general/self-hosting-fonts-on-gatbsy-v2~971fa5bd-6a95-4ac6-bf92-aedc59ed1bab
// https://github.com/KyleAMathews/typefaces
require("typeface-lato")
require("typeface-bebas-neue")

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { 
    faSchool,
    faExternalLinkSquareAlt,
    faEnvelope,
    faPhone
} from '@fortawesome/free-solid-svg-icons'
 
library.add(fab, 
    faExternalLinkSquareAlt,
    faEnvelope,
    faPhone,
    faSchool
    )