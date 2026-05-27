import { TouchableOpacity, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import { isTablet } from "./AllContext";
import { COLORS } from '../constants/colors';

type IconComponent = React.FC<SVGElement & { isActive: boolean, color: string }>;


export type IconNamesList = 'splash' | 'logo' | 'notification' | 'calender' | 'clockIn' | 'clockOut' | 'eyeIcon' | 'attendenceIcon' | 'remainderIcon' | 'leaveIcon' | 'requestIcon' | 'dashboardIcon' | 'profileIcon' | 'taskIcon' | 'moreIcon' | 'exitIcon' | 'addIcon' | 'travelIcon' | 'policies' | 'settings' | 'internetIcon' | 'instaIcon' | 'likedInIcon' | 'checkbox' | 'messageIcon' | 'close' | 'task' | 'event' | 'leave' | 'request' | 'timer' | 'meal' | 'back' | 'check' | 'headerclose' | 'filter' | 'checkOutfilled' | 'delete' | 'checkRounded' | 'sponsicoreMessageIcon' | 'downArrow' | 'upArrow' | 'geminiStar' | 'birthdayIcon' | 'starIcon' | 'clickUploadIcon' | 'editIcon' | 'eyeIconGreen' | 'clock' | 'closeBalck' | 'rightArrow' | 'greenTick' | 'emptybox' | 'emptyCircle' | 'filledCircle' | 'resetIcon' | 'pinIcon' | 'threeDots' | 'addGreen' | 'leftArrow' | 'rightArrow2' | 'profileBanner' | 'messageIcon2' | 'phone' | 'mail' | 'arrowIOSRight' | 'arrowIOSDown' | 'greenProfileIcon' | 'greenDocumentIcon' | 'greenSponsorshipIcon' | 'englandFlag' | 'eyeIconBlack' | 'downloadIcon' | 'historyIcon' | 'docBlack' | 'taskIcon2' | 'taskIconGreen' | 'dueIcon' | 'locationIcon' | 'peopleIcon' | 'travelIcon2' | 'personGreenIcon' | 'leafIcon' | 'leafIconOutfilled' | 'eyeClose' | 'policiesIconGreen' | 'arrowRightIOSGreen' | 'resetPasswordIcon' | 'supportIcon' | 'logOutIcon' | 'themeEyeIcon' | 'closeBlack' | 'attachmentIcon' | 'cameraIcon' | 'galleryIcon' | 'documentIcon' | 'snackSuccess' | 'snackError' | 'snackWarning' | 'snackInfo' | 'blackTickIcon' | 'updateIcon' | 'expireIcon' | 'noInternet' | 'closeMore' | 'greenCalender' | 'arrowUpGreen' | 'uploadIcon' | 'uploadIconGreen' | 'uploadPrimaryIcon' | 'lockIcon' | 'addIconGreen' | 'travelIcon3' | 'pendingIcon' | 'peopleIconGreen' | 'cancelCalender' | 'hamperIcon'

const Icons: Record<IconNamesList, IconComponent> = {

    hamperIcon: () => `<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  
  <defs>
    <!-- Purple Gradient -->
    <linearGradient id="basketGradient" x1="50" y1="40" x2="170" y2="180" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C084FC"/>
      <stop offset="1" stop-color="#7C3AED"/>
    </linearGradient>

    <!-- Glow -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Basket Body -->
  <g filter="url(#glow)">
    
    <!-- Handle -->
    <path
      d="M85 90L110 55L135 90"
      stroke="url(#basketGradient)"
      stroke-width="10"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />

    <!-- Basket -->
    <path
      d="M60 90
         H160
         L145 150
         H75
         Z"
      fill="url(#basketGradient)"
      stroke="url(#basketGradient)"
      stroke-width="6"
      stroke-linejoin="round"
    />

    <!-- Hole -->
    <circle
      cx="110"
      cy="120"
      r="12"
      fill="#05010D"
    />
  </g>

</svg>`,

    cancelCalender: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 16.9502C15.1569 16.9502 16.5 15.607 16.5 13.9502C16.5 12.2933 15.1569 10.9502 13.5 10.9502C11.8431 10.9502 10.5 12.2933 10.5 13.9502C10.5 15.607 11.8431 16.9502 13.5 16.9502Z" stroke="#625982" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 1.2002V3.4502M12 1.2002V3.4502M2.625 6.51738H15.375M14.3049 14.7825L12.7148 13.2M14.2892 13.2151L12.6992 14.8051M15.75 6.0752V11.9702C15.2025 11.3477 14.4 10.9502 13.5 10.9502C11.8425 10.9502 10.5 12.2927 10.5 13.9502C10.5 14.5127 10.6575 15.0452 10.935 15.4952C11.0925 15.7652 11.295 16.0052 11.5275 16.2002H6C3.375 16.2002 2.25 14.7002 2.25 12.4502V6.0752C2.25 3.8252 3.375 2.3252 6 2.3252H12C14.625 2.3252 15.75 3.8252 15.75 6.0752Z" stroke="#625982" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.99588 9.9751H9.00262" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.22244 9.9751H6.22918" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.22244 12.7501H6.22918" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

 
    `,

    peopleIconGreen: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.10671 7.24667C6.04004 7.24 5.96004 7.24 5.88671 7.24667C4.30004 7.19333 3.04004 5.89333 3.04004 4.29333C3.04004 2.66 4.36004 1.33333 6.00004 1.33333C7.63337 1.33333 8.96004 2.66 8.96004 4.29333C8.95337 5.89333 7.69337 7.19333 6.10671 7.24667Z" fill="white" stroke="#36A368" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9399 2.66667C12.2333 2.66667 13.2733 3.71333 13.2733 5C13.2733 6.26 12.2733 7.28667 11.0266 7.33333C10.9733 7.32667 10.9133 7.32667 10.8533 7.33333" fill="white"/>
<path d="M10.9399 2.66667C12.2333 2.66667 13.2733 3.71333 13.2733 5C13.2733 6.26 12.2733 7.28667 11.0266 7.33333C10.9733 7.32667 10.9133 7.32667 10.8533 7.33333" stroke="#36A368" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.77323 9.70666C1.1599 10.7867 1.1599 12.5467 2.77323 13.62C4.60657 14.8467 7.61323 14.8467 9.44657 13.62C11.0599 12.54 11.0599 10.78 9.44657 9.70666C7.6199 8.48666 4.61323 8.48666 2.77323 9.70666Z" fill="white" stroke="#36A368" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2266 13.3333C12.7066 13.2333 13.1599 13.04 13.5332 12.7533C14.5732 11.9733 14.5732 10.6867 13.5332 9.90667C13.1666 9.62667 12.7199 9.44 12.2466 9.33334" fill="white"/>
<path d="M12.2266 13.3333C12.7066 13.2333 13.1599 13.04 13.5332 12.7533C14.5732 11.9733 14.5732 10.6867 13.5332 9.90667C13.1666 9.62667 12.7199 9.44 12.2466 9.33334" stroke="#36A368" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

    pendingIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 11.75C3 16.58 6.92 20.5 11.75 20.5C16.58 20.5 20.5 16.58 20.5 11.75C20.5 6.92 16.58 3 11.75 3C10.0853 3 8.52872 3.46565 7.20346 4.27371M7.20346 4.27371L8 1.5M7.20346 4.27371L9.5 5.5" stroke="#E32326" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 8.5V12.5L13.5 15" stroke="#E32326" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

    travelIcon3: () => `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 3L10.4931 1.99319C10.4894 1.44357 10.0428 1 9.49316 1H8.50684C7.95189 1 7.50308 1.45188 7.50686 2.00681L7.51363 3" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
<path d="M6.52344 16.9727C6.52344 16.7281 6.72177 16.5298 6.96639 16.5298C7.211 16.5298 7.40933 16.7281 7.40933 16.9727C7.40933 17.2173 7.211 17.4156 6.96639 17.4156C6.72177 17.4156 6.52344 17.2173 6.52344 16.9727Z" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
<path d="M10.957 16.9727C10.957 16.7281 11.1554 16.5298 11.4 16.5298C11.6446 16.5298 11.8429 16.7281 11.8429 16.9727C11.8429 17.2173 11.6446 17.4156 11.4 17.4156C11.1554 17.4156 10.957 17.2173 10.957 16.9727Z" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
<path d="M3.5 5C3.5 3.89543 4.39543 3 5.5 3H12.5C13.6046 3 14.5 3.89543 14.5 5V14C14.5 15.1046 13.6046 16 12.5 16H5.5C4.39543 16 3.5 15.1046 3.5 14V5Z" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
<path d="M6.84668 8.33643C7.20403 8.33662 7.49314 8.56956 7.49316 8.85693V13.1948C7.49316 13.4822 7.20404 13.7151 6.84668 13.7153C6.48911 13.7153 6.19922 13.4823 6.19922 13.1948V8.85693C6.19924 8.56944 6.48912 8.33643 6.84668 8.33643ZM11.1621 5.30029C11.5195 5.30029 11.8093 5.53251 11.8096 5.81982V13.1948C11.8096 13.4823 11.5197 13.7153 11.1621 13.7153C10.8047 13.7152 10.5156 13.4822 10.5156 13.1948V5.81982C10.5159 5.5326 10.8049 5.30045 11.1621 5.30029Z" fill="#625982"/>
</svg>
`,

    addIconGreen: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V19" stroke="#36A368" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 12L5 12" stroke="#36A368" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,

    lockIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z" stroke="#2A7E51" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    uploadPrimaryIcon: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.88003 10.0612C2.40449 9.52138 2.04575 8.86826 1.83099 8.15154C1.61623 7.43474 1.55107 6.67307 1.64046 5.92417C1.72985 5.17527 1.97143 4.4588 2.34692 3.82903C2.72241 3.19925 3.22195 2.67268 3.80771 2.28921C4.39346 1.90573 5.05007 1.67541 5.7278 1.61568C6.40553 1.55595 7.0866 1.66839 7.71943 1.94447C8.35228 2.22056 8.92028 2.65305 9.38036 3.20919C9.84052 3.76532 10.1807 4.43052 10.3752 5.15439H11.5209C12.1389 5.15431 12.7405 5.37511 13.2369 5.78415C13.7333 6.1932 14.0982 6.76881 14.2776 7.42595C14.4569 8.08306 14.4413 8.7869 14.2331 9.43346C14.0248 10.08 13.635 10.635 13.1211 11.0164" stroke="#353046" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 8V14.4011" stroke="#353046" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.558 10.845L7.99776 8L5.4375 10.845" stroke="#353046" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

    uploadIconGreen: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.59809 12.5764C3.00366 11.9016 2.55524 11.0852 2.28678 10.1893C2.01833 9.2933 1.93689 8.34121 2.04862 7.40509C2.16036 6.46897 2.46234 5.57338 2.9317 4.78616C3.40106 3.99894 4.02549 3.34073 4.75768 2.86139C5.48987 2.38204 6.31064 2.09414 7.1578 2.01948C8.00496 1.94482 8.8563 2.08537 9.64734 2.43047C10.4384 2.77558 11.1484 3.31619 11.7235 4.01136C12.2987 4.70653 12.7239 5.53803 12.9671 6.44287H14.3992C15.1717 6.44277 15.9237 6.71876 16.5442 7.23007C17.1647 7.74138 17.6208 8.46089 17.845 9.28232C18.0692 10.1037 18.0497 10.9835 17.7894 11.7917C17.5291 12.5999 17.0418 13.2936 16.3994 13.7704" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 10V18.0014" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.1975 13.5562L9.9972 10L6.79688 13.5562" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    uploadIcon: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.59809 12.5764C3.00366 11.9016 2.55524 11.0852 2.28678 10.1893C2.01833 9.2933 1.93689 8.34121 2.04862 7.40509C2.16036 6.46897 2.46234 5.57338 2.9317 4.78616C3.40106 3.99894 4.02549 3.34073 4.75768 2.86139C5.48987 2.38204 6.31064 2.09414 7.1578 2.01948C8.00496 1.94482 8.8563 2.08537 9.64734 2.43047C10.4384 2.77558 11.1484 3.31619 11.7235 4.01136C12.2987 4.70653 12.7239 5.53803 12.9671 6.44287H14.3992C15.1717 6.44277 15.9237 6.71876 16.5442 7.23007C17.1647 7.74138 17.6208 8.46089 17.845 9.28232C18.0692 10.1037 18.0497 10.9835 17.7894 11.7917C17.5291 12.5999 17.0418 13.2936 16.3994 13.7704" stroke="#625982" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 10V18.0014" stroke="#625982" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.1975 13.5562L9.99721 10L6.79688 13.5562" stroke="#625982" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    arrowUpGreen: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 15L12.5 9.5L18 15" stroke="#36A368" stroke-width="1.6" stroke-linecap="round"/>
</svg>
`,


    greenCalender: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66406 1.66699V4.16699" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3359 1.66699V4.16699" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 7.08366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V7.08366C2.5 4.58366 3.75 2.91699 6.66667 2.91699H13.3333C16.25 2.91699 17.5 4.58366 17.5 7.08366Z" fill="white" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.502 7.5V14.1667C17.502 16.6667 16.252 18.3333 13.3353 18.3333H6.66862C3.75196 18.3333 2.50196 16.6667 2.50196 14.1667L2.5 7.5H17.502Z" fill="white" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4121 11.4167H10.4196" stroke="#36A368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.91209 11.4167H6.91957" stroke="#36A368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.91209 14.4167H6.91957" stroke="#36A368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    closeMore: () => `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1L1 11" stroke="#B3ADC7" stroke-width="1.4" stroke-linecap="round"/>
<path d="M11 11L1 1" stroke="#B3ADC7" stroke-width="1.4" stroke-linecap="round"/>
</svg>

    `,

    noInternet: () => `<svg width="80" height="74" viewBox="0 0 80 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_13757_1853)">
<path d="M40 7.02991C53.3465 7.02992 66.2984 13.3364 77.6523 25.1731C78.4088 25.9618 78.3615 27.2141 77.5662 27.9636L73.9319 31.3884C73.1194 32.154 71.8378 32.1021 71.0621 31.2993C61.0238 20.9104 50.3169 16.0966 40 16.0966C29.6831 16.0966 18.9762 20.9103 8.93793 31.2993C8.16224 32.1021 6.88057 32.154 6.06814 31.3884L2.43385 27.9636C1.63849 27.2141 1.59122 25.9618 2.34773 25.1731C13.7016 13.3364 26.6535 7.0299 40 7.02991Z" fill="url(#paint0_linear_13757_1853)"/>
</g>
<g filter="url(#filter1_i_13757_1853)">
<path d="M39.9972 25.1633C49.2154 25.1633 58.0534 29.4437 65.7329 37.2702C66.4983 38.0502 66.4497 39.303 65.6543 40.0526L62.02 43.4774C61.2076 44.2429 59.9282 44.1906 59.1401 43.4001C52.8115 37.0521 46.2193 34.23 39.9972 34.23C33.7751 34.23 27.1829 37.052 20.8543 43.4001C20.0662 44.1906 18.7868 44.2429 17.9744 43.4774L14.3401 40.0525C13.5447 39.303 13.4961 38.0502 14.2615 37.2702C21.941 29.4436 30.779 25.1633 39.9972 25.1633Z" fill="url(#paint1_linear_13757_1853)"/>
</g>
<g filter="url(#filter2_i_13757_1853)">
<path d="M39.9938 43.2966C45.4989 43.2966 50.7952 45.3962 55.4394 49.2411C56.2813 49.9381 56.3268 51.1933 55.5913 52.0017L52.2242 55.7029C51.473 56.5286 50.1971 56.5696 49.3177 55.8821C46.1876 53.4347 42.9962 52.3633 39.9938 52.3633C36.9914 52.3633 33.8 53.4347 30.6699 55.8821C29.7905 56.5696 28.5146 56.5286 27.7634 55.7029L24.3963 52.0017C23.6608 51.1933 23.7063 49.9381 24.5482 49.2411C29.1924 45.3962 34.4887 43.2966 39.9938 43.2966Z" fill="url(#paint2_linear_13757_1853)"/>
</g>
<path d="M45.659 64.9558C45.659 68.2941 42.9931 71.0003 39.7045 71.0003C36.4159 71.0003 33.75 68.2941 33.75 64.9558C33.75 61.6176 36.4159 58.9114 39.7045 58.9114C42.9931 58.9114 45.659 61.6176 45.659 64.9558Z" fill="#7C7C7C"/>
<g filter="url(#filter3_i_13757_1853)">
<path d="M34.7422 11.0593C34.7422 8.27738 36.9638 6.02222 39.7043 6.02222L-nan -nanL39.7043 6.02222C42.4448 6.02222 44.6664 8.27738 44.6664 11.0593V49.3407C44.6664 52.1226 42.4448 54.3778 39.7043 54.3778L-nan -nanL39.7043 54.3778C36.9638 54.3778 34.7422 52.1226 34.7422 49.3407V11.0593Z" fill="url(#paint3_linear_13757_1853)"/>
</g>
<path d="M44.6671 11.0593C44.6671 8.27738 42.4455 6.02222 39.705 6.02222C36.9645 6.02222 34.7429 8.27738 34.7429 11.0593V49.3407C34.7429 52.1226 36.9645 54.3778 39.705 54.3778C42.36 54.3778 44.5276 52.2611 44.6603 49.5995L44.6671 49.3407V11.0593ZM47.6444 49.3407C47.6444 53.7917 44.0898 57.4 39.705 57.4C35.3202 57.4 31.7656 53.7917 31.7656 49.3407V11.0593C31.7656 6.60825 35.3202 3 39.705 3C44.0898 3 47.6444 6.60825 47.6444 11.0593V49.3407Z" fill="white"/>
<defs>
<filter id="filter0_i_13757_1853" x="1.80774" y="7.02991" width="76.3845" height="26.0879" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1.18475"/>
<feGaussianBlur stdDeviation="0.992229"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13757_1853"/>
</filter>
<filter id="filter1_i_13757_1853" x="13.7146" y="25.1633" width="52.5653" height="20.0447" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1.18475"/>
<feGaussianBlur stdDeviation="0.992229"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13757_1853"/>
</filter>
<filter id="filter2_i_13757_1853" x="23.8784" y="43.2966" width="32.2308" height="14.251" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1.18475"/>
<feGaussianBlur stdDeviation="0.992229"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13757_1853"/>
</filter>
<filter id="filter3_i_13757_1853" x="34.7422" y="6.02222" width="9.92419" height="49.5403" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1.18475"/>
<feGaussianBlur stdDeviation="0.992229"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13757_1853"/>
</filter>
<linearGradient id="paint0_linear_13757_1853" x1="40" y1="16.4389" x2="40" y2="45.206" gradientUnits="userSpaceOnUse">
<stop stop-color="#E0E0E0"/>
<stop offset="1" stop-color="#D6D6D6"/>
</linearGradient>
<linearGradient id="paint1_linear_13757_1853" x1="39.9972" y1="32.3638" x2="39.9972" y2="54.3784" gradientUnits="userSpaceOnUse">
<stop stop-color="#E0E0E0"/>
<stop offset="1" stop-color="#D6D6D6"/>
</linearGradient>
<linearGradient id="paint2_linear_13757_1853" x1="39.9938" y1="48.3784" x2="39.9938" y2="63.9154" gradientUnits="userSpaceOnUse">
<stop stop-color="#E0E0E0"/>
<stop offset="1" stop-color="#D6D6D6"/>
</linearGradient>
<linearGradient id="paint3_linear_13757_1853" x1="39.7043" y1="6.02222" x2="39.7043" y2="54.3778" gradientUnits="userSpaceOnUse">
<stop stop-color="#E0E0E0"/>
<stop offset="1" stop-color="#D6D6D6"/>
</linearGradient>
</defs>
</svg>

`,

    expireIcon: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9198 12H13.3143C11.8025 12 11.6859 13.2155 12.5021 13.8772L16.732 17.3151C17.5483 17.9768 17.4317 19.1923 15.9198 19.1923H13.3143C11.8025 19.1923 11.6859 17.9768 12.5021 17.3151L16.732 13.8772C17.5483 13.2155 17.4317 12 15.9198 12Z" stroke="#EF3336" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.92556 4.27734V7.54657M7.92188 9.5013H7.92775" stroke="#EF3336" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.1016 18.6016H5.60156C4.49699 18.6016 3.60156 17.7061 3.60156 16.6016V3.60156C3.60156 2.49699 4.49699 1.60156 5.60156 1.60156H11.8579C12.3973 1.60156 12.9139 1.81947 13.2903 2.20584L15.9325 4.91753C16.2964 5.291 16.5 5.79181 16.5 6.31325V8.14957" stroke="#EF3336" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    updateIcon: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 1.59961H11.9785C12.347 1.59974 12.7009 1.74578 12.9629 2.00488L15.9844 4.99316C16.2502 5.25604 16.4003 5.61447 16.4004 5.98828V17C16.4004 17.7732 15.7732 18.4004 15 18.4004H5C4.2268 18.4004 3.59961 17.7732 3.59961 17V3C3.59961 2.2268 4.2268 1.59961 5 1.59961Z" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.20312 10.7019L9.30312 12.7788L13.5031 8.625" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,

    blackTickIcon: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 11L9.38909 14.889L17.1664 7.11084" stroke="#625982" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    snackInfo: () => `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_13490_4035)">
<path d="M10.413 1.19268C11.7792 -0.397561 14.2208 -0.397561 15.587 1.19268C16.3625 2.09528 17.5433 2.5299 18.711 2.34256C20.7684 2.01251 22.6387 3.59963 22.6746 5.70597C22.6949 6.9015 23.3232 8.00199 24.3368 8.61757C26.1227 9.70214 26.5466 12.1338 25.2353 13.7706C24.491 14.6997 24.2728 15.9511 24.658 17.0816C25.3367 19.0733 24.1159 21.2116 22.071 21.6131C20.9103 21.8409 19.9477 22.6578 19.5243 23.7741C18.7782 25.7411 16.4839 26.5855 14.6622 25.5638C13.6283 24.9838 12.3717 24.9838 11.3378 25.5638C9.51607 26.5855 7.22177 25.7411 6.47572 23.7741C6.05227 22.6578 5.0897 21.8409 3.92903 21.6131C1.88409 21.2116 0.663314 19.0733 1.34199 17.0816C1.72719 15.9511 1.50899 14.6997 0.764697 13.7706C-0.546641 12.1338 -0.122672 9.70214 1.66317 8.61757C2.67678 8.00199 3.30505 6.9015 3.3254 5.70597C3.36126 3.59963 5.23159 2.01251 7.28898 2.34256C8.45672 2.5299 9.63748 2.09528 10.413 1.19268Z" fill="#625982"/>
</g>
<path d="M14.7014 6C15.0665 6 15.3728 6.13168 15.6201 6.39505C15.8734 6.65842 16 6.97691 16 7.35053C16 7.72415 15.8734 8.04264 15.6201 8.30601C15.3669 8.56938 15.0607 8.70106 14.7014 8.70106C14.3481 8.70106 14.0448 8.56938 13.7915 8.30601C13.5383 8.04264 13.4117 7.72415 13.4117 7.35053C13.4117 6.97691 13.5353 6.65842 13.7827 6.39505C14.0359 6.13168 14.3422 6 14.7014 6ZM15.2491 10.2261L13.4382 16.7583C13.338 17.1319 13.288 17.3769 13.288 17.4933C13.288 17.5607 13.3145 17.625 13.3675 17.6862C13.4205 17.7413 13.4764 17.7689 13.5353 17.7689C13.6355 17.7689 13.7356 17.723 13.8357 17.6311C14.1007 17.4045 14.4187 16.9941 14.7898 16.4L15.0901 16.5837C14.2008 18.1946 13.2556 19 12.2544 19C11.8716 19 11.5654 18.8898 11.3357 18.6693C11.1119 18.4426 11 18.1578 11 17.8148C11 17.5882 11.0501 17.3004 11.1502 16.9512L12.3781 12.5597C12.4959 12.1371 12.5548 11.8186 12.5548 11.6042C12.5548 11.4695 12.4988 11.3501 12.3869 11.2459C12.275 11.1418 12.1219 11.0898 11.9276 11.0898C11.8392 11.0898 11.7332 11.0928 11.6095 11.0989L11.7244 10.7314L14.7191 10.2261H15.2491Z" fill="white"/>
<defs>
<filter id="filter0_i_13490_4035" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13490_4035"/>
</filter>
</defs>
</svg>
`,
    snackWarning: () => `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_13490_4025)">
<path d="M10.413 1.19268C11.7792 -0.397561 14.2208 -0.397561 15.587 1.19268C16.3625 2.09528 17.5433 2.5299 18.711 2.34256C20.7684 2.01251 22.6387 3.59963 22.6746 5.70597C22.6949 6.9015 23.3232 8.00199 24.3368 8.61757C26.1227 9.70214 26.5466 12.1338 25.2353 13.7706C24.491 14.6997 24.2728 15.9511 24.658 17.0816C25.3367 19.0733 24.1159 21.2116 22.071 21.6131C20.9103 21.8409 19.9477 22.6578 19.5243 23.7741C18.7782 25.7411 16.4839 26.5855 14.6622 25.5638C13.6283 24.9838 12.3717 24.9838 11.3378 25.5638C9.51607 26.5855 7.22177 25.7411 6.47572 23.7741C6.05227 22.6578 5.0897 21.8409 3.92903 21.6131C1.88409 21.2116 0.663314 19.0733 1.34199 17.0816C1.72719 15.9511 1.50899 14.6997 0.764697 13.7706C-0.546641 12.1338 -0.122672 9.70214 1.66317 8.61757C2.67678 8.00199 3.30505 6.9015 3.3254 5.70597C3.36126 3.59963 5.23159 2.01251 7.28898 2.34256C8.45672 2.5299 9.63748 2.09528 10.413 1.19268Z" fill="#FAAD14"/>
</g>
<path d="M13.0547 7.99976V13.3898M13.0547 18.7798H13.0682" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<filter id="filter0_i_13490_4025" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13490_4025"/>
</filter>
</defs>
</svg>
`,
    snackSuccess: () => `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_13470_3474)">
<path d="M10.413 1.19268C11.7792 -0.397561 14.2208 -0.397561 15.587 1.19268C16.3625 2.09528 17.5433 2.5299 18.711 2.34256C20.7684 2.01251 22.6387 3.59963 22.6746 5.70597C22.6949 6.9015 23.3232 8.00199 24.3368 8.61757C26.1227 9.70214 26.5466 12.1338 25.2353 13.7706C24.491 14.6997 24.2728 15.9511 24.658 17.0816C25.3367 19.0733 24.1159 21.2116 22.071 21.6131C20.9103 21.8409 19.9477 22.6578 19.5243 23.7741C18.7782 25.7411 16.4839 26.5855 14.6622 25.5638C13.6283 24.9838 12.3717 24.9838 11.3378 25.5638C9.51607 26.5855 7.22177 25.7411 6.47572 23.7741C6.05227 22.6578 5.0897 21.8409 3.92903 21.6131C1.88409 21.2116 0.663314 19.0733 1.34199 17.0816C1.72719 15.9511 1.50899 14.6997 0.764697 13.7706C-0.546641 12.1338 -0.122672 9.70214 1.66317 8.61757C2.67678 8.00199 3.30505 6.9015 3.3254 5.70597C3.36126 3.59963 5.23159 2.01251 7.28898 2.34256C8.45672 2.5299 9.63748 2.09528 10.413 1.19268Z" fill="#699A6D"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7187 8.28835C19.0979 8.67282 19.0979 9.29616 18.7187 9.68062L11.5598 16.94L8.28436 13.6186C7.90521 13.2341 7.90521 12.6108 8.28436 12.2263C8.6635 11.8418 9.27822 11.8418 9.65736 12.2263L11.5598 14.1555L17.3457 8.28835C17.7249 7.90388 18.3396 7.90388 18.7187 8.28835Z" fill="white"/>
<defs>
<filter id="filter0_i_13470_3474" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13470_3474"/>
</filter>
</defs>
</svg>
`,
    snackError: () => `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_13470_3482)">
<path d="M10.413 1.19268C11.7792 -0.397561 14.2208 -0.397561 15.587 1.19268C16.3625 2.09528 17.5433 2.5299 18.711 2.34256C20.7684 2.01251 22.6387 3.59963 22.6746 5.70597C22.6949 6.9015 23.3232 8.00199 24.3368 8.61757C26.1227 9.70214 26.5466 12.1338 25.2353 13.7706C24.491 14.6997 24.2728 15.9511 24.658 17.0816C25.3367 19.0733 24.1159 21.2116 22.071 21.6131C20.9103 21.8409 19.9477 22.6578 19.5243 23.7741C18.7782 25.7411 16.4839 26.5855 14.6622 25.5638C13.6283 24.9838 12.3717 24.9838 11.3378 25.5638C9.51607 26.5855 7.22177 25.7411 6.47572 23.7741C6.05227 22.6578 5.0897 21.8409 3.92903 21.6131C1.88409 21.2116 0.663314 19.0733 1.34199 17.0816C1.72719 15.9511 1.50899 14.6997 0.764697 13.7706C-0.546641 12.1338 -0.122672 9.70214 1.66317 8.61757C2.67678 8.00199 3.30505 6.9015 3.3254 5.70597C3.36126 3.59963 5.23159 2.01251 7.28898 2.34256C8.45672 2.5299 9.63748 2.09528 10.413 1.19268Z" fill="#EF3336"/>
</g>
<path d="M13.0547 7.99976V13.3898M13.0547 18.7798H13.0682" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<filter id="filter0_i_13470_3482" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_13470_3482"/>
</filter>
</defs>
</svg>
`,
    documentIcon: () => `<svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8002 26.5H10.8359C9.73137 26.5 8.83594 25.6034 8.83594 24.4989C8.83594 18.5294 8.83594 14.4706 8.83594 8.50115C8.83594 7.39658 9.73137 6.5 10.8359 6.5L18.7211 6.5C19.1985 6.5 19.6602 6.67078 20.0227 6.98149L23.1375 9.65136C23.5808 10.0313 23.8359 10.586 23.8359 11.1699L23.8359 18.375" stroke="#36A368" stroke-width="1.2" stroke-linecap="round"/>
<path d="M12.5859 10.25H15.3984" stroke="#36A368" stroke-width="1.2" stroke-linecap="round"/>
<path d="M18.8359 16.5L16.3359 14M16.3359 14L13.8359 16.5M16.3359 14L16.3359 20.25" stroke="#625982" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.2109 23.5L18.6717 23.9608C19.4528 24.7418 20.7191 24.7418 21.5002 23.9608L23.8359 21.625" stroke="#36A368" stroke-width="1.2" stroke-linecap="round"/>
</svg>
`,

    galleryIcon: () => `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 22.75L11.851 16.8209C12.2511 16.3319 12.9989 16.3319 13.399 16.8209L17.5503 21.8948C17.9249 22.3527 18.613 22.387 19.0313 21.9687L21.9179 19.0821C22.3084 18.6916 22.9416 18.6916 23.3321 19.0821L27 22.75" stroke="#625982" stroke-width="1.2" stroke-linecap="round"/>
<path d="M7 17.75V8.5C7 7.39543 7.89543 6.5 9 6.5H25C26.1046 6.5 27 7.39543 27 8.5V24.5C27 25.6046 26.1046 26.5 25 26.5H24.5M7 22.75V24.5C7 25.6046 7.89543 26.5 9 26.5H20.125" stroke="#36A368" stroke-width="1.2" stroke-linecap="round"/>
<circle cx="22" cy="11.5" r="1.85" stroke="#625982" stroke-width="1.2"/>
</svg>
`,

    cameraIcon: () => `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1859 26.5H22.6659C25.4259 26.5 26.5259 24.81 26.6559 22.75L27.1759 14.49C27.3159 12.33 25.5959 10.5 23.4259 10.5C22.8159 10.5 22.2559 10.15 21.9759 9.61L21.2559 8.16C20.7959 7.25 19.5959 6.5 18.5759 6.5H16.2859C15.2559 6.5 14.0559 7.25 13.5959 8.16L12.8759 9.61C12.5959 10.15 12.0359 10.5 11.4259 10.5C9.25595 10.5 7.53595 12.33 7.67595 14.49L8.19595 22.75C8.31595 24.81 9.42595 26.5 12.1859 26.5Z" stroke="#36A368" stroke-width="1.2" stroke-linecap="round"/>
<path d="M15.9258 12.5H18.9258" stroke="#36A368" stroke-width="1.2" stroke-linecap="round"/>
<path d="M17.4258 22.5C19.2158 22.5 20.6758 21.04 20.6758 19.25C20.6758 17.46 19.2158 16 17.4258 16C15.6358 16 14.1758 17.46 14.1758 19.25C14.1758 21.04 15.6358 22.5 17.4258 22.5Z" stroke="#625982" stroke-width="1.2" stroke-linecap="round"/>
</svg>
`,

    attachmentIcon: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.6841 12.8103C7.91683 13.6034 6.99463 14 5.9175 14C4.84038 14 3.91818 13.6034 3.15091 12.8103C2.38364 12.0172 2 11.0639 2 9.95043C2 8.83699 2.38364 7.8837 3.15091 7.09056L7.24547 2.85796C7.79879 2.28599 8.46278 2 9.23742 2C10.0121 2 10.6761 2.28599 11.2294 2.85796C11.7827 3.42993 12.0594 4.1163 12.0594 4.91706C12.0594 5.71783 11.7827 6.40419 11.2294 6.97617L7.35614 10.98C7.01677 11.3308 6.611 11.5062 6.13883 11.5062C5.66667 11.5062 5.2609 11.3308 4.92153 10.98C4.58216 10.6292 4.41248 10.2097 4.41248 9.72164C4.41248 9.23355 4.58216 8.81411 4.92153 8.4633L9.0161 4.2307L9.90141 5.14585L5.80684 9.37845C5.71093 9.4776 5.66298 9.59199 5.66298 9.72164C5.66298 9.85129 5.71093 9.96568 5.80684 10.0648C5.90275 10.164 6.01341 10.2135 6.13883 10.2135C6.26425 10.2135 6.37492 10.164 6.47083 10.0648L10.3441 6.06101C10.6465 5.73308 10.7996 5.34986 10.8033 4.91134C10.807 4.47283 10.6539 4.09342 10.3441 3.77312C10.0342 3.45281 9.66533 3.29266 9.23742 3.29266C8.80952 3.29266 8.44064 3.45281 8.13078 3.77312L4.03622 8.00572C3.50503 8.53956 3.24128 9.18589 3.24497 9.94471C3.24866 10.7035 3.51241 11.3537 4.03622 11.8951C4.55265 12.429 5.17421 12.694 5.90091 12.6902C6.6276 12.6864 7.26023 12.4214 7.79879 11.8951L12.1147 7.43375L13 8.3489L8.6841 12.8103Z" fill="#36A368"/>
</svg>
`,

    closeBlack: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 7L7 17.5" stroke="#7C7CA7" stroke-width="1.4" stroke-linecap="round"/>
<path d="M17.5 17.5L7 7" stroke="#7C7CA7" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,

    themeEyeIcon: () => `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.08829 6.99995C9.08829 8.15495 8.15495 9.08829 6.99995 9.08829C5.84495 9.08829 4.91162 8.15495 4.91162 6.99995C4.91162 5.84495 5.84495 4.91162 6.99995 4.91162C8.15495 4.91162 9.08829 5.84495 9.08829 6.99995Z" fill="white" stroke="#625982" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.99991 11.8242C9.05908 11.8242 10.9782 10.6109 12.3141 8.51088C12.8391 7.68838 12.8391 6.30588 12.3141 5.48338C10.9782 3.38338 9.05908 2.17004 6.99991 2.17004C4.94074 2.17004 3.02158 3.38338 1.68574 5.48338C1.16074 6.30588 1.16074 7.68838 1.68574 8.51088C3.02158 10.6109 4.94074 11.8242 6.99991 11.8242Z" stroke="#625982" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    logOutIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.2 2H9.8C13 2 15 4 15 7.2V11.25H8.75C8.34 11.25 8 11.59 8 12C8 12.41 8.34 12.75 8.75 12.75H15V16.8C15 20 13 22 9.8 22H7.21C4.01 22 2.01 20 2.01 16.8V7.2C2 4 4 2 7.2 2Z" fill="white"/>
<path d="M19.4401 11.25L17.3701 9.17997C17.2201 9.02997 17.1501 8.83997 17.1501 8.64997C17.1501 8.45997 17.2201 8.25997 17.3701 8.11997C17.6601 7.82997 18.1401 7.82997 18.4301 8.11997L21.7801 11.47C22.0701 11.76 22.0701 12.24 21.7801 12.53L18.4301 15.88C18.1401 16.17 17.6601 16.17 17.3701 15.88C17.0801 15.59 17.0801 15.11 17.3701 14.82L19.4401 12.75H15.0001V11.25H19.4401Z" fill="white"/>
</svg>
`,

    supportIcon: () => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.37684 12.3115C8.37684 11.7592 7.92531 11.3021 7.38255 11.4042C6.32631 11.603 5.34562 12.1156 4.57484 12.8864C3.56649 13.8947 3 15.2623 3 16.6884C3 18.1144 3.56649 19.482 4.57484 20.4904C5.34562 21.2611 6.32631 21.7737 7.38255 21.9725C7.92531 22.0746 8.37684 21.6175 8.37684 21.0652V12.3115Z" fill="white"/>
<path d="M19.6192 12.3115C19.6192 11.7592 20.0708 11.3021 20.6135 11.4042C21.6698 11.603 22.6505 12.1156 23.4213 12.8864C24.4296 13.8947 24.9961 15.2623 24.9961 16.6884C24.9961 18.1144 24.4296 19.482 23.4213 20.4904C22.6505 21.2611 21.6698 21.7737 20.6135 21.9725C20.0708 22.0746 19.6192 21.6175 19.6192 21.0652V12.3115Z" fill="white"/>
<path d="M6.91064 11.8012V10.0877C6.91064 6.17326 10.0839 3 13.9983 3C17.9127 3 21.086 6.17326 21.086 10.0877V11.8012" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
<path d="M21.0857 21.0869C21.0857 23.248 19.3337 25 17.1726 25H13.998" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,

    resetPasswordIcon: () => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.63135 12.1776V10.8333C9.63135 8.6084 10.3033 6.80029 13.6633 6.80029C17.0233 6.80029 17.6953 8.6084 17.6953 10.8333V12.1776" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.0341 20.2404H10.3141C7.6261 20.2404 6.9541 19.5682 6.9541 16.8796V15.5352C6.9541 12.8466 7.6261 12.1744 10.3141 12.1744H17.0341C19.7221 12.1744 20.3941 12.8466 20.3941 15.5352V16.8796C20.3941 19.5682 19.7221 20.2404 17.0341 20.2404Z" fill="white"/>
<path d="M2 17.6C2 22.244 5.756 26 10.4 26L9.14001 23.9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.0001 10.4C26.0001 5.756 22.2441 2 17.6001 2L18.8601 4.1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    arrowRightIOSGreen: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99609 18L15.5079 13.0606C16.1588 12.4773 16.1588 11.5227 15.5079 10.9394L9.99609 6" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    policiesIconGreen: () => `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="36" height="36" rx="18" fill="#E8F7EF"/>
<path d="M23.6523 14.1976H27.9996V11.589C27.9996 11.589 27.9996 8.98047 25.826 8.98047" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.8271 8.9807H13.7422C11.533 8.9807 9.74219 10.7716 9.74219 12.9807V22.0235L21.0451 26.3711C22.4856 26.3711 23.6534 25.2033 23.6534 23.7627V13.763C23.6534 12.024 23.6534 9.41546 25.8271 8.9807Z" fill="white" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99616 22.0234H18.8643C18.8863 24.3684 19.299 25.9363 21.0379 26.371H10.1698C8.35158 25.4905 7.99062 24.4331 7.99616 22.0234Z" fill="white" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.4336 18.7632H19.9545" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6182 11.748C16.6976 11.7351 16.7794 11.7408 16.8564 11.7665L18.4854 12.3105C18.7367 12.3945 18.8791 12.6602 18.8096 12.9159L18.2676 14.9081C18.2359 15.0247 18.1629 15.1263 18.0625 15.1933L16.9756 15.9179C16.8077 16.0298 16.5888 16.0298 16.4209 15.9179L15.334 15.1933C15.2336 15.1264 15.1607 15.0254 15.1289 14.9091L14.584 12.9169C14.514 12.6609 14.6564 12.3945 14.9082 12.3105L16.54 11.7665L16.6182 11.748Z" stroke="#36A368" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    eyeClose: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8974 7.10244L7.10244 10.8974C6.61494 10.4099 6.31494 9.74244 6.31494 8.99994C6.31494 7.51494 7.51494 6.31494 8.99994 6.31494C9.74244 6.31494 10.4099 6.61494 10.8974 7.10244Z" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3649 4.32761C12.0524 3.33761 10.5524 2.79761 8.99988 2.79761C6.35238 2.79761 3.88488 4.35761 2.16738 7.05761C1.49238 8.11511 1.49238 9.89261 2.16738 10.9501C2.75988 11.8801 3.44988 12.6826 4.19988 13.3276" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.31494 14.6475C7.16994 15.0075 8.07744 15.2025 8.99994 15.2025C11.6474 15.2025 14.1149 13.6425 15.8324 10.9425C16.5074 9.88501 16.5074 8.10751 15.8324 7.05001C15.5849 6.66001 15.3149 6.29251 15.0374 5.94751" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6326 9.5249C11.4376 10.5824 10.5751 11.4449 9.51758 11.6399" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.1025 10.8975L1.5 16.5" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 1.5L10.8975 7.1025" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    leafIconOutfilled: () => `<svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.54102 2.39062C10.0047 -0.397084 13.9953 -0.397084 15.459 2.39062C16.2678 3.9312 17.8906 4.8684 19.6289 4.79883C22.7743 4.67274 24.7699 8.13006 23.0879 10.792C22.1586 12.2629 22.1584 14.1375 23.0879 15.6084C24.7699 18.2703 22.7743 21.7267 19.6289 21.6006C17.8907 21.531 16.2678 22.4684 15.459 24.0088C13.9954 26.7967 10.0046 26.7967 8.54102 24.0088C7.73217 22.4684 6.10926 21.531 4.37109 21.6006C1.22568 21.7267 -0.769924 18.2703 0.912109 15.6084C1.84155 14.1375 1.84144 12.2629 0.912109 10.792C-0.769948 8.13006 1.22567 4.67274 4.37109 4.79883C6.1094 4.8684 7.73223 3.9312 8.54102 2.39062Z" fill="white" stroke="#36A368" stroke-width="0.6"/>
</svg>

`,

    leafIcon: () => `<svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.27563 2.25145C9.85163 -0.750484 14.1484 -0.750484 15.7244 2.25145C16.4794 3.68958 17.9945 4.56457 19.6172 4.49953C23.0043 4.36375 25.1527 8.08576 23.3416 10.9519C22.4739 12.325 22.4739 14.075 23.3416 15.4481C25.1527 18.3142 23.0043 22.0362 19.6172 21.9005C17.9945 21.8354 16.4794 22.7104 15.7244 24.1485C14.1484 27.1505 9.85163 27.1505 8.27563 24.1485C7.52062 22.7104 6.00546 21.8354 4.38281 21.9005C0.995703 22.0362 -1.15267 18.3142 0.658442 15.4481C1.52608 14.075 1.52608 12.325 0.658442 10.9519C-1.15267 8.08576 0.995703 4.36375 4.38281 4.49953C6.00546 4.56457 7.52062 3.68958 8.27563 2.25145Z" fill="#36A368"/>
</svg>
`,

    personGreenIcon: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 15.8333C15 13.9924 12.7614 12.5 10 12.5C7.23858 12.5 5 13.9924 5 15.8333M10 10C8.15905 10 6.66667 8.50763 6.66667 6.66668C6.66667 4.82573 8.15905 3.33334 10 3.33334C11.8409 3.33334 13.3333 4.82573 13.3333 6.66668C13.3333 8.50763 11.8409 10 10 10Z" stroke="#36A368" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    travelIcon2: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1207 3.70677V2C13.1207 1.44772 12.673 1 12.1207 1H10.5117C9.95943 1 9.51172 1.44772 9.51172 2V3.70677" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.15625 20.4736C8.15625 20.1829 8.39189 19.9473 8.68257 19.9473C8.97324 19.9473 9.20888 20.1829 9.20888 20.4736C9.20888 20.7643 8.97324 20.9999 8.68257 20.9999C8.39189 20.9999 8.15625 20.7643 8.15625 20.4736Z" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.4219 20.4736C13.4219 20.1829 13.6575 19.9473 13.9482 19.9473C14.2389 19.9473 14.4745 20.1829 14.4745 20.4736C14.4745 20.7643 14.2389 20.9999 13.9482 20.9999C13.6575 20.9999 13.4219 20.7643 13.4219 20.4736Z" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 6.15701C5 5.05245 5.89543 4.15701 7 4.15701H15.6316C16.7362 4.15701 17.6316 5.05244 17.6316 6.15701V17.9465C17.6316 19.0511 16.7361 19.9465 15.6316 19.9465H7C5.89543 19.9465 5 19.0511 5 17.9465V6.15701Z" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.58203 17.3144V12.0512C8.58203 11.7024 8.86439 11.4201 9.2132 11.4201C9.56201 11.4201 9.84437 11.7024 9.84437 12.0512V17.3144C9.84437 17.6632 9.56201 17.9455 9.2132 17.9455C8.86439 17.9455 8.58203 17.6632 8.58203 17.3144ZM12.7926 17.3144V8.36701C12.7926 8.0182 13.0749 7.73584 13.4237 7.73584C13.7725 7.73584 14.0549 8.0182 14.0549 8.36701V17.3144C14.0549 17.6632 13.7725 17.9455 13.4237 17.9455C13.0749 17.9455 12.7926 17.6632 12.7926 17.3144Z" fill="#36A368"/>
</svg>
`,
    peopleIcon: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.10671 7.24667C6.04004 7.24 5.96004 7.24 5.88671 7.24667C4.30004 7.19333 3.04004 5.89333 3.04004 4.29333C3.04004 2.66 4.36004 1.33333 6.00004 1.33333C7.63337 1.33333 8.96004 2.66 8.96004 4.29333C8.95337 5.89333 7.69337 7.19333 6.10671 7.24667Z" fill="white" stroke="#7B719D" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9399 2.66667C12.2333 2.66667 13.2733 3.71333 13.2733 5C13.2733 6.26 12.2733 7.28667 11.0266 7.33333C10.9733 7.32667 10.9133 7.32667 10.8533 7.33333" fill="white"/>
<path d="M10.9399 2.66667C12.2333 2.66667 13.2733 3.71333 13.2733 5C13.2733 6.26 12.2733 7.28667 11.0266 7.33333C10.9733 7.32667 10.9133 7.32667 10.8533 7.33333" stroke="#7B719D" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.77323 9.70666C1.1599 10.7867 1.1599 12.5467 2.77323 13.62C4.60657 14.8467 7.61323 14.8467 9.44657 13.62C11.0599 12.54 11.0599 10.78 9.44657 9.70666C7.6199 8.48666 4.61323 8.48666 2.77323 9.70666Z" fill="white" stroke="#7B719D" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2266 13.3333C12.7066 13.2333 13.1599 13.04 13.5332 12.7533C14.5732 11.9733 14.5732 10.6867 13.5332 9.90667C13.1666 9.62667 12.7199 9.44 12.2466 9.33334" fill="white"/>
<path d="M12.2266 13.3333C12.7066 13.2333 13.1599 13.04 13.5332 12.7533C14.5732 11.9733 14.5732 10.6867 13.5332 9.90667C13.1666 9.62667 12.7199 9.44 12.2466 9.33334" stroke="#7B719D" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    locationIcon: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99992 8.95334C9.14867 8.95334 10.0799 8.02209 10.0799 6.87334C10.0799 5.72458 9.14867 4.79333 7.99992 4.79333C6.85117 4.79333 5.91992 5.72458 5.91992 6.87334C5.91992 8.02209 6.85117 8.95334 7.99992 8.95334Z" fill="white" stroke="#7B719D" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.4133 5.66C3.72664 -0.113337 12.28 -0.10667 13.5866 5.66666C14.3533 9.05333 12.2466 11.92 10.4 13.6933C9.05997 14.9867 6.93997 14.9867 5.5933 13.6933C3.7533 11.92 1.64664 9.04666 2.4133 5.66Z" stroke="#7B719D" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    taskIcon2: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9979 5.65071H15.0116C13.549 5.65071 12.3633 4.465 12.3633 3.00237V1.01611L16.9979 5.65071Z" fill="#625982"/>
<path d="M10.0822 1H5C2.79086 1 1 2.79086 1 5V13C1 15.2091 2.79086 17 5 17H12.7808C14.99 17 16.7808 15.2091 16.7808 13V7.77778" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
<path d="M6.26172 9.44439L8.01514 11.2222L11.9603 7.22217" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    taskIconGreen: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9979 5.65071H15.0116C13.549 5.65071 12.3633 4.465 12.3633 3.00237V1.01611L16.9979 5.65071Z" fill="#36A368"/>
<path d="M10.0822 1H5C2.79086 1 1 2.79086 1 5V13C1 15.2091 2.79086 17 5 17H12.7808C14.99 17 16.7808 15.2091 16.7808 13V7.77778" stroke="#36A368" stroke-width="1.4" stroke-linecap="round"/>
<path d="M6.26172 9.44439L8.01514 11.2222L11.9603 7.22217" stroke="#36A368" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    dueIcon: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9333 8.46667C16.9333 6.9899 16.4954 5.5463 15.675 4.31841C14.8545 3.09052 13.6884 2.1335 12.324 1.56837C10.9597 1.00323 9.45838 0.855367 8.00999 1.14347C6.5616 1.43157 5.23117 2.1427 4.18694 3.18694C3.1427 4.23117 2.43157 5.5616 2.14347 7.00999C1.85537 8.45838 2.00323 9.95968 2.56837 11.324C3.1335 12.6884 4.09052 13.8545 5.31841 14.675C6.5463 15.4954 7.9899 15.9333 9.46667 15.9333" stroke="#EF3336" stroke-width="1.4" stroke-linecap="round"/>
<path d="M9.99896 4.19922V8.46589H6.26562" stroke="#EF3336" stroke-width="1.4" stroke-linecap="round"/>
<path d="M14 11V13.5" stroke="#EF3336" stroke-width="1.4" stroke-linecap="round"/>
<path d="M14 15.8999V16.3999" stroke="#EF3336" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    docBlack: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 14.5C14.3431 14.5 13 15.8431 13 17.5V20L18.5 14.5H16Z" fill="#36A368"/>
<path d="M18.3307 14.666V5.83268C18.3307 3.62354 16.5399 1.83269 14.3307 1.83269H7.66407C5.45493 1.83269 3.66406 3.62355 3.66406 5.83269V16.166C3.66406 18.3752 5.45492 20.166 7.66406 20.166H12.8307M18.3307 14.666L12.8307 20.166M18.3307 14.666H14.8307C13.7262 14.666 12.8307 15.5614 12.8307 16.666V20.166" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.33594 9.29883H11.2645" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.33594 6.28516H13.6217" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    eyeIconBlack: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9242 11.7697C14.9242 13.3885 13.616 14.6966 11.9972 14.6966C10.3784 14.6966 9.07031 13.3885 9.07031 11.7697C9.07031 10.1509 10.3784 8.84277 11.9972 8.84277C13.616 8.84277 14.9242 10.1509 14.9242 11.7697Z" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18.5309C14.8861 18.5309 17.5759 16.8304 19.4481 13.8871C20.184 12.7343 20.184 10.7966 19.4481 9.64384C17.5759 6.70056 14.8861 5 12 5C9.11395 5 6.42412 6.70056 4.55187 9.64384C3.81604 10.7966 3.81604 12.7343 4.55187 13.8871C6.42412 16.8304 9.11395 18.5309 12 18.5309Z" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    downloadIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0391 5L12.0391 14.9195" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 18L7.0805 18" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5391 11.0693L12.039 15.5694L7.53893 11.0693" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    historyIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.52783 7.23643C8.25517 3.88409 13.1837 3.37742 16.5361 6.10476C19.8884 8.8321 20.3951 13.7607 17.6678 17.113C14.9404 20.4654 10.0119 20.972 6.65951 18.2447C5.75689 17.5103 5.06057 16.6164 4.57812 15.6367M5.52783 7.23643L5.5292 4M5.52783 7.23643H8.6016M11.2071 9.21707V12.7392L13.8155 14.4338" stroke="#353046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    englandFlag: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_12469_99334" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
<path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="white"/>
</mask>
<g mask="url(#mask0_12469_99334)">
<path d="M0 0L0.25 0.6875L0 1.40625V2.125L1 3.8125L0 5.5V6.5L1 8L0 9.5V10.5L1 12.1875L0 13.875V16L0.6875 15.75L1.40625 16H2.125L3.8125 15L5.5 16H6.5L8 15L9.5 16H10.5L12.1875 15L13.875 16H16L15.75 15.3125L16 14.5938V13.875L15 12.1875L16 10.5V9.5L15 8L16 6.5V5.5L15 3.8125L16 2.125V0L15.3125 0.25L14.5938 0H13.875L12.1875 1L10.5 0H9.5L8 1L6.5 0H5.5L3.8125 1L2.125 0H0Z" fill="#EEEEEE"/>
<path d="M10.5 0V3.375L13.875 0H10.5ZM16 2.125L12.625 5.5H16V2.125ZM0 5.5H3.375L0 2.125V5.5ZM2.125 0L5.5 3.375V0H2.125ZM5.5 16V12.625L2.125 16H5.5ZM0 13.875L3.375 10.5H0V13.875ZM16 10.5H12.625L16 13.875V10.5ZM13.875 16L10.5 12.625V16H13.875Z" fill="#0052B4"/>
<path d="M0 0V1.40625L4.09375 5.5H5.5L0 0ZM6.5 0V6.5H0V9.5H6.5V16H9.5V9.5H16V6.5H9.5V0H6.5ZM14.5938 0L10.5 4.09375V5.5L16 0H14.5938ZM5.5 10.5L0 16H1.40625L5.5 11.9062V10.5ZM10.5 10.5L16 16V14.5938L11.9062 10.5H10.5Z" fill="#D80027"/>
</g>
</svg>
`,

    greenSponsorshipIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 14.709L10.9974 16.7087L15.706 12" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    greenDocumentIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 13H13" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 17H11" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    greenProfileIcon: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 0.75H7.75C2.75 0.75 0.75 2.75 0.75 7.75V13.75C0.75 17.53 1.89 19.6 4.61 20.37C4.83 17.77 7.5 15.72 10.75 15.72C14 15.72 16.67 17.77 16.89 20.37C19.61 19.6 20.75 17.53 20.75 13.75V7.75C20.75 2.75 18.75 0.75 13.75 0.75ZM10.75 12.92C8.77 12.92 7.17 11.31 7.17 9.33002C7.17 7.35002 8.77 5.75 10.75 5.75C12.73 5.75 14.33 7.35002 14.33 9.33002C14.33 11.31 12.73 12.92 10.75 12.92Z" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    arrowIOSRight: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.00132 18.0001L15.0007 12.0007L8.99951 5.99987" stroke="#978FB2" stroke-width="1.2" stroke-linecap="round"/>
</svg>
`,
    arrowIOSDown: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 9L12.5 14.5L18 9" stroke="#36A368" stroke-width="1.6" stroke-linecap="round"/>
</svg>
`,

    phone: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6468 12.22C14.6468 12.46 14.5935 12.7067 14.4802 12.9467C14.3668 13.1867 14.2202 13.4133 14.0268 13.6267C13.7002 13.9867 13.3402 14.2467 12.9335 14.4133C12.5335 14.58 12.1002 14.6667 11.6335 14.6667C10.9535 14.6667 10.2268 14.5067 9.46016 14.18C8.6935 13.8533 7.92683 13.4133 7.16683 12.86C6.40016 12.3 5.6735 11.68 4.98016 10.9933C4.2935 10.3 3.6735 9.57334 3.12016 8.81334C2.5735 8.05334 2.1335 7.29334 1.8135 6.54C1.4935 5.78 1.3335 5.05334 1.3335 4.36C1.3335 3.90667 1.4135 3.47334 1.5735 3.07334C1.7335 2.66667 1.98683 2.29334 2.34016 1.96C2.76683 1.54 3.2335 1.33334 3.72683 1.33334C3.9135 1.33334 4.10016 1.37334 4.26683 1.45334C4.44016 1.53334 4.5935 1.65334 4.7135 1.82667L6.26016 4.00667C6.38016 4.17334 6.46683 4.32667 6.52683 4.47334C6.58683 4.61334 6.62016 4.75334 6.62016 4.88C6.62016 5.04 6.5735 5.2 6.48016 5.35334C6.3935 5.50667 6.26683 5.66667 6.10683 5.82667L5.60016 6.35334C5.52683 6.42667 5.4935 6.51334 5.4935 6.62C5.4935 6.67334 5.50016 6.72 5.5135 6.77334C5.5335 6.82667 5.5535 6.86667 5.56683 6.90667C5.68683 7.12667 5.8935 7.41334 6.18683 7.76C6.48683 8.10667 6.80683 8.46 7.1535 8.81334C7.5135 9.16667 7.86016 9.49334 8.2135 9.79334C8.56016 10.0867 8.84683 10.2867 9.0735 10.4067C9.10683 10.42 9.14683 10.44 9.1935 10.46C9.24683 10.48 9.30016 10.4867 9.36016 10.4867C9.4735 10.4867 9.56016 10.4467 9.6335 10.3733L10.1402 9.87334C10.3068 9.70667 10.4668 9.58 10.6202 9.5C10.7735 9.40667 10.9268 9.36 11.0935 9.36C11.2202 9.36 11.3535 9.38667 11.5002 9.44667C11.6468 9.50667 11.8002 9.59334 11.9668 9.70667L14.1735 11.2733C14.3468 11.3933 14.4668 11.5333 14.5402 11.7C14.6068 11.8667 14.6468 12.0333 14.6468 12.22Z" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10"/>
<path d="M12.3333 6C12.3333 5.6 12.02 4.98666 11.5533 4.48666C11.1267 4.02666 10.56 3.66666 10 3.66666" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 6C14.6667 3.42 12.58 1.33334 10 1.33334" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    mail: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3335 13.6667H4.66683C2.66683 13.6667 1.3335 12.6667 1.3335 10.3333V5.66667C1.3335 3.33334 2.66683 2.33334 4.66683 2.33334H11.3335C13.3335 2.33334 14.6668 3.33334 14.6668 5.66667V10.3333C14.6668 12.6667 13.3335 13.6667 11.3335 13.6667Z" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3332 6L9.2465 7.66667C8.55983 8.21333 7.43317 8.21333 6.7465 7.66667L4.6665 6" stroke="#36A368" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    messageIcon2: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.08317 15.8333H6.6665C3.33317 15.8333 1.6665 15 1.6665 10.8333V6.66666C1.6665 3.33332 3.33317 1.66666 6.6665 1.66666H13.3332C16.6665 1.66666 18.3332 3.33332 18.3332 6.66666V10.8333C18.3332 14.1667 16.6665 15.8333 13.3332 15.8333H12.9165C12.6582 15.8333 12.4082 15.9583 12.2498 16.1667L10.9998 17.8333C10.4498 18.5667 9.54984 18.5667 8.99984 17.8333L7.74984 16.1667C7.6165 15.9833 7.30817 15.8333 7.08317 15.8333Z" fill="white" stroke="#4C4464" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.8335 6.66667H14.1668" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.8335 10.8333H10.8335" stroke="#4C4464" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    profileBanner: () => `<svg width="320" height="64" viewBox="0 0 320 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 4C0 1.79086 1.79086 0 4 0H316C318.209 0 320 1.79086 320 4V60C320 62.2091 318.209 64 316 64H4C1.79086 64 0 62.2091 0 60V4Z" fill="url(#paint0_radial_12469_99203)"/>
<defs>
<radialGradient id="paint0_radial_12469_99203" cx="0" cy="0" r="1" gradientTransform="matrix(-182.063 35.4233 -135.412 -181.152 160 28.5767)" gradientUnits="userSpaceOnUse">
<stop stop-color="#D1B9E7"/>
<stop offset="0.473874" stop-color="#F6EAF7"/>
<stop offset="0.655187" stop-color="#D8C5E9"/>
<stop offset="1" stop-color="#EADEF5"/>
</radialGradient>
</defs>
</svg>
`,

    leftArrow: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="-0.5" y="0.5" width="23" height="23" rx="7.5" transform="matrix(-1 0 0 1 23 0)" fill="white"/>
<rect x="-0.5" y="0.5" width="23" height="23" rx="7.5" transform="matrix(-1 0 0 1 23 0)" stroke="#CFCBDC"/>
<path d="M13.0942 15.9961L9 11.6611L13.0942 7.32609" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    rightArrow2: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="23" height="23" rx="7.5" fill="white"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="7.5" stroke="#CFCBDC"/>
<path d="M10.9058 15.9961L15 11.6611L10.9058 7.32609" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    addGreen: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 4.5V13.5" stroke="#36A368" stroke-width="1.4" stroke-linecap="round"/>
<path d="M13.5 9L4.5 9" stroke="#36A368" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,

    threeDots: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="7" r="1" fill="#353046"/>
<circle cx="11" cy="11" r="1" fill="#353046"/>
<circle cx="11" cy="15" r="1" fill="#353046"/>
</svg>
`,

    pinIcon: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5297 4.77808H10.5052H7C4.79086 4.77808 3 6.56894 3 8.77808V15C3 17.2091 4.79086 19 7 19H13.2205C15.4296 19 17.2205 17.2091 17.2205 15V12.2841V9.64216" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2975 4.23814C15.9357 3.55433 17.0074 3.51743 17.6911 4.15572C18.3749 4.794 18.4118 5.86576 17.7736 6.54957L12.3752 12.3335C11.7836 12.9674 11.002 13.3919 10.1482 13.543L8.68864 13.8013L8.8459 12.3272C8.93789 11.465 9.30754 10.656 9.89917 10.0221L15.2975 4.23814Z" fill="#36A368" stroke="#353046" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    resetIcon: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6648 10.0007C16.6648 8.53309 16.1805 7.10654 15.2871 5.94224C14.3937 4.77795 13.1411 3.94098 11.7236 3.56115C10.306 3.18132 8.80274 3.27985 7.44689 3.84146C6.09104 4.40307 4.95839 5.39637 4.22461 6.66732" stroke="#625982" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.16406 3.33398L4.16406 6.66732H7.08073" stroke="#625982" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.35158 10.0004C3.34756 11.468 3.8279 12.8959 4.7181 14.0626C5.6083 15.2293 6.85862 16.0697 8.27513 16.4535C9.69163 16.8372 11.1952 16.7428 12.5526 16.1849C13.9099 15.627 15.0453 14.6368 15.7826 13.3678" stroke="#625982" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8438 16.25L15.8436 13.3777L13.3322 13.3777" stroke="#625982" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    greenTick: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="4" fill="#36A368"/>
<path d="M4.25 8L6.75 10.5L11.75 5.5" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    emptybox: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white"/>
<rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#D7D7E4"/>
</svg>
`,
    emptyCircle: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5Z" fill="white"/>
<path d="M8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5Z" stroke="#D7D7E4"/>
</svg>
`,
    filledCircle: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#36A368"/>
<circle cx="8" cy="8" r="4" fill="white"/>
</svg>
`,
    rightArrow: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_12469_101525)">
<path d="M6 12H17.4545M13.498 8L17.498 12L13.498 16" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_d_12469_101525" x="-1" y="-1" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="0.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.72549 0 0 0 0 0.72549 0 0 0 0 0.815686 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12469_101525"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12469_101525" result="shape"/>
</filter>
</defs>
</svg>
`,

    closeBalck: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 7L7 17.5" stroke="#7C7CA7" stroke-width="1.4" stroke-linecap="round"/>
<path d="M17.5 17.5L7 7" stroke="#7C7CA7" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    clock: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9" cy="9" r="7" fill="white" stroke="#7B719D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5L9 9H13" stroke="#7B719D" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    eyeIconGreen: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3866 7.99995C10.3866 9.31995 9.31995 10.3866 7.99995 10.3866C6.67995 10.3866 5.61328 9.31995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C9.31995 5.61328 10.3866 6.67995 10.3866 7.99995Z" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.9999 13.5133C10.3532 13.5133 12.5466 12.1266 14.0732 9.72665C14.6732 8.78665 14.6732 7.20665 14.0732 6.26665C12.5466 3.86665 10.3532 2.47998 7.9999 2.47998C5.64656 2.47998 3.45323 3.86665 1.92656 6.26665C1.32656 7.20665 1.32656 8.78665 1.92656 9.72665C3.45323 12.1266 5.64656 13.5133 7.9999 13.5133Z" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    birthdayIcon: () => `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4551 2.18253C14.809 -0.727511 19.191 -0.727512 21.5449 2.18253C22.643 3.54006 24.2728 4.33797 26.0014 4.36439C29.707 4.42103 32.4391 7.90406 31.6689 11.5895C31.3096 13.3087 31.7121 15.1016 32.7695 16.4921C35.0364 19.4727 34.0613 23.816 30.7469 25.5016C29.2007 26.2879 28.0729 27.7257 27.6629 29.4332C26.784 33.0934 22.8359 35.0263 19.4732 33.4428C17.9044 32.7041 16.0956 32.7041 14.5268 33.4428C11.1641 35.0263 7.21601 33.0934 6.33713 29.4332C5.92714 27.7257 4.79932 26.2879 3.25315 25.5016C-0.0612773 23.816 -1.03637 19.4727 1.23046 16.4921C2.28792 15.1016 2.69044 13.3087 2.33112 11.5895C1.56087 7.90406 4.29301 4.42103 7.99857 4.36439C9.72721 4.33797 11.357 3.54006 12.4551 2.18253Z" fill="url(#paint0_linear_12469_102179)"/>
<path d="M26 17.0004C26 16.47 25.7955 15.9613 25.4314 15.5862C25.0674 15.2112 24.5737 15.0005 24.0588 15.0005H17.5294V13.8551C18.1269 13.7285 18.6638 13.3936 19.0496 12.9068C19.4353 12.4199 19.6464 11.8109 19.6471 11.1825C19.6471 8.7371 17.39 7.15808 17.2938 7.09171C17.2068 7.03191 17.1046 7 17 7C16.8954 7 16.7932 7.03191 16.7062 7.09171C16.61 7.15808 14.3529 8.7371 14.3529 11.1825C14.3536 11.8109 14.5647 12.4199 14.9504 12.9068C15.3362 13.3936 15.8731 13.7285 16.4706 13.8551V15.0005H9.94118C9.42634 15.0005 8.9326 15.2112 8.56856 15.5862C8.20452 15.9613 8 16.47 8 17.0004V19.1212C8.00058 19.8959 8.24864 20.6489 8.70588 21.2639V25.0001C8.70588 25.5305 8.9104 26.0392 9.27444 26.4142C9.63848 26.7893 10.1322 27 10.6471 27H23.3529C23.8678 27 24.3615 26.7893 24.7256 26.4142C25.0896 26.0392 25.2941 25.5305 25.2941 25.0001V21.2639C25.7514 20.6489 25.9994 19.8959 26 19.1212V17.0004ZM15.4118 11.1825C15.4118 9.78251 16.4706 8.69074 17 8.23349C17.5294 8.68801 18.5882 9.77888 18.5882 11.1825C18.5882 11.6164 18.4209 12.0326 18.1231 12.3395C17.8252 12.6464 17.4212 12.8188 17 12.8188C16.5788 12.8188 16.1748 12.6464 15.8769 12.3395C15.5791 12.0326 15.4118 11.6164 15.4118 11.1825ZM9.05882 17.0004C9.05882 16.7593 9.15179 16.5281 9.31726 16.3576C9.48273 16.1871 9.70716 16.0913 9.94118 16.0913H24.0588C24.2928 16.0913 24.5173 16.1871 24.6827 16.3576C24.8482 16.5281 24.9412 16.7593 24.9412 17.0004V19.1212C24.9412 20.423 23.9415 21.5102 22.7124 21.5448C22.4057 21.5538 22.1004 21.4993 21.8146 21.3846C21.5287 21.2699 21.2681 21.0973 21.0481 20.8771C20.8281 20.6568 20.6533 20.3933 20.5339 20.1022C20.4145 19.811 20.3529 19.4982 20.3529 19.1821C20.3529 19.0375 20.2972 18.8987 20.1979 18.7965C20.0986 18.6942 19.9639 18.6367 19.8235 18.6367C19.6831 18.6367 19.5485 18.6942 19.4492 18.7965C19.3499 18.8987 19.2941 19.0375 19.2941 19.1821C19.2941 19.809 19.0524 20.4102 18.6222 20.8534C18.192 21.2967 17.6084 21.5457 17 21.5457C16.3916 21.5457 15.808 21.2967 15.3778 20.8534C14.9476 20.4102 14.7059 19.809 14.7059 19.1821C14.7059 19.0375 14.6501 18.8987 14.5508 18.7965C14.4515 18.6942 14.3169 18.6367 14.1765 18.6367C14.0361 18.6367 13.9014 18.6942 13.8021 18.7965C13.7028 18.8987 13.6471 19.0375 13.6471 19.1821C13.6472 19.4983 13.5858 19.8112 13.4664 20.1024C13.347 20.3937 13.1722 20.6573 12.9522 20.8777C12.7322 21.098 12.4715 21.2707 12.1856 21.3854C11.8997 21.5002 11.5944 21.5547 11.2876 21.5457C10.0585 21.5102 9.05882 20.423 9.05882 19.1212V17.0004ZM23.3529 25.9091H10.6471C10.413 25.9091 10.1886 25.8134 10.0231 25.6429C9.85767 25.4724 9.76471 25.2412 9.76471 25.0001V22.2102C10.2222 22.4746 10.7351 22.6209 11.2594 22.6365C11.7077 22.6502 12.1542 22.5707 12.572 22.4026C12.9898 22.2346 13.3705 21.9814 13.6912 21.6584C13.8747 21.4735 14.0375 21.268 14.1765 21.0457C14.4798 21.5336 14.8974 21.9351 15.3908 22.2132C15.8842 22.4913 16.4376 22.6371 17 22.6371C17.5624 22.6371 18.1158 22.4913 18.6092 22.2132C19.1026 21.9351 19.5202 21.5336 19.8235 21.0457C19.9631 21.2681 20.1264 21.4736 20.3106 21.6584C20.9348 22.2875 21.7739 22.6388 22.6471 22.6365H22.7415C23.2655 22.6208 23.7781 22.4745 24.2353 22.2102V25.0001C24.2353 25.2412 24.1423 25.4724 23.9769 25.6429C23.8114 25.8134 23.587 25.9091 23.3529 25.9091Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_12469_102179" x1="37.5" y1="3" x2="5.5" y2="28" gradientUnits="userSpaceOnUse">
<stop offset="0.541715" stop-color="#659AEF"/>
<stop offset="1" stop-color="#34C75A"/>
</linearGradient>
</defs>
</svg>


`,
    starIcon: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7299 3.50989L15.4899 7.02989C15.7299 7.51989 16.3699 7.98989 16.9099 8.07989L20.0999 8.60989C22.1399 8.94989 22.6199 10.4299 21.1499 11.8899L18.6699 14.3699C18.2499 14.7899 18.0199 15.5999 18.1499 16.1799L18.8599 19.2499C19.4199 21.6799 18.1299 22.6199 15.9799 21.3499L12.9899 19.5799C12.4499 19.2599 11.5599 19.2599 11.0099 19.5799L8.01991 21.3499C5.87991 22.6199 4.57991 21.6699 5.13991 19.2499L5.84991 16.1799C5.97991 15.5999 5.74991 14.7899 5.32991 14.3699L2.84991 11.8899C1.38991 10.4299 1.85991 8.94989 3.89991 8.60989L7.08991 8.07989C7.61991 7.98989 8.25991 7.51989 8.49991 7.02989L10.2599 3.50989C11.2199 1.59989 12.7799 1.59989 13.7299 3.50989Z" fill="url(#paint0_linear_12469_102284)"/>
<defs>
<linearGradient id="paint0_linear_12469_102284" x1="24.0622" y1="3.82783" x2="5.3543" y2="18.5642" gradientUnits="userSpaceOnUse">
<stop offset="0.541715" stop-color="#659AEF"/>
<stop offset="1" stop-color="#34C75A"/>
</linearGradient>
</defs>
</svg>
`,
    clickUploadIcon: () => `<svg width="72" height="58" viewBox="0 0 72 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_3492_7480)">
<path d="M1.57592 26.771C0.711102 24.7016 1.71647 22.3257 3.80399 21.5056L14 17.5L14 56.5L1.57592 26.771Z" fill="white"/>
</g>
<path d="M3.98683 21.9712L13.4993 18.2325L13.4992 54.0063L2.03722 26.5786C1.28052 24.768 2.1603 22.6888 3.98683 21.9712Z" stroke="#CFCBDC"/>
<g filter="url(#filter1_i_3492_7480)">
<path d="M70.3147 26.771C71.1795 24.7016 70.1742 22.3257 68.0866 21.5056L57.8906 17.5L57.8906 56.5L70.3147 26.771Z" fill="white"/>
</g>
<path d="M67.9038 21.9712L58.3913 18.2325L58.3915 54.0063L69.8534 26.5786C70.6101 24.768 69.7303 22.6888 67.9038 21.9712Z" stroke="#CFCBDC"/>
<path d="M17 0.5H43.126C44.0705 0.5 44.9759 0.881781 45.6348 1.55859L57.5078 13.7559C58.1439 14.4093 58.5 15.2854 58.5 16.1973V54C58.5 55.933 56.933 57.5 55 57.5H17C15.067 57.5 13.5 55.933 13.5 54V4C13.5 2.067 15.067 0.5 17 0.5Z" fill="white" stroke="#CFCBDC"/>
<path d="M20 11H35" stroke="#CFCBDC" stroke-width="2" stroke-linecap="round"/>
<path d="M20 18H27" stroke="#CFCBDC" stroke-width="2" stroke-linecap="round"/>
<path d="M44.0016 13.4984L44.0035 9C44.5134 11.7569 45.0917 13.2238 46.6006 14.3949C47.1631 14.8314 47.8788 15 48.5908 15H57.0021C57.5549 15 58.0029 15.4486 58.0021 16.0014L58 17.5H48.0016C45.7919 17.5 44.0007 15.7081 44.0016 13.4984Z" fill="#B3ADC8"/>
<path d="M44.5 0.5V11.2887C44.5 13.4978 46.2909 15.2887 48.5 15.2887H58.5" stroke="#CFCBDC"/>
<path d="M40.3758 42.1847L36.0105 37.8193M36.0105 37.8193L31.6452 42.1847M36.0105 37.8193V47.6413M45.1668 44.7929C46.2312 44.2127 47.0721 43.2944 47.5567 42.1832C48.0413 41.0719 48.142 39.8309 47.843 38.656C47.5439 37.4812 46.8622 36.4393 45.9053 35.695C44.9484 34.9506 43.7708 34.5461 42.5585 34.5453H41.1834C40.8531 33.2676 40.2374 32.0815 39.3827 31.076C38.5279 30.0705 37.4563 29.2718 36.2485 28.7401C35.0407 28.2083 33.728 27.9573 32.4092 28.0059C31.0904 28.0545 29.7998 28.4014 28.6344 29.0206C27.4689 29.6398 26.459 30.5151 25.6806 31.5808C24.9022 32.6465 24.3754 33.8747 24.14 35.1733C23.9046 36.4718 23.9666 37.8068 24.3214 39.0779C24.6762 40.349 25.3146 41.5232 26.1885 42.5121" stroke="#CFCBDC" stroke-width="2" stroke-linecap="round"/>
<path d="M14 52C14 53.1046 14.8954 54 16 54H56C57.1046 54 58 53.1046 58 52V54C58 55.6569 56.6569 57 55 57H17C15.3431 57 14 55.6569 14 54V52Z" fill="#F1F0F5"/>
<defs>
<filter id="filter0_i_3492_7480" x="1.26562" y="17.5" width="12.7344" height="39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-3"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.924243 0 0 0 0 0.917483 0 0 0 0 0.947901 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_3492_7480"/>
</filter>
<filter id="filter1_i_3492_7480" x="57.8906" y="17.5" width="12.7344" height="39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-3"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.924243 0 0 0 0 0.917483 0 0 0 0 0.947901 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_3492_7480"/>
</filter>
</defs>
</svg>

 
 
`,

    editIcon: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99524 3.21283L4.36025 8.11881C4.18524 8.30511 4.01587 8.67207 3.982 8.92612L3.77312 10.7553C3.69972 11.4158 4.17395 11.8674 4.82883 11.7545L6.6467 11.444C6.90075 11.3989 7.25641 11.2126 7.43143 11.0206L12.0664 6.11464C12.8681 5.26781 13.2294 4.30242 11.9817 3.1225C10.7397 1.95388 9.79691 2.366 8.99524 3.21283Z" stroke="#625982" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.21875 4.03125C8.46151 5.58942 9.72611 6.78063 11.2956 6.9387" stroke="#625982" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.19922 13.5996H13.3612" stroke="#625982" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    downArrow: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 7L9 11L13 7" stroke="#625982" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`, upArrow: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 11L9 7L13 11" stroke="#36A368" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,

    splash: () => `<svg width="131" height="144" viewBox="0 0 131 144" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M61.6368 103.918C89.5137 103.918 115.258 81.5391 119.137 53.9335C123.017 26.3278 100.009 0.501465 72.1324 0.501465C44.2555 0.501465 22.0657 26.3278 18.1859 53.9335C14.3062 81.5391 33.7599 103.918 61.6368 103.918Z" fill="url(#paint0_linear_12469_103976)"/>
<path d="M68.4052 103.353L66.646 98.9552C75.8817 94.3373 92.1542 87.0807 99.1909 80.0439L103.589 85.3215C95.0129 94.3373 80.9394 102.474 68.4052 103.353Z" fill="url(#paint1_linear_12469_103976)"/>
<path d="M70.757 0.217588C98.5128 0.217588 117.882 22.4987 114.02 49.9844C110.157 77.47 84.5241 99.7521 56.7684 99.7521C29.0126 99.752 9.64404 77.47 13.5069 49.9844C17.3698 22.4988 43.0013 0.217656 70.757 0.217588Z" fill="url(#paint2_linear_12469_103976)" stroke="url(#paint3_linear_12469_103976)" stroke-width="0.438652"/>
<path d="M55.0961 70.0069L39.4048 49.5911L38.1343 46.9987L57.1718 55.238L88.1408 28.356L89.4043 30.9125L55.0961 70.0069Z" fill="#36A368"/>
<path d="M53.8123 67.0293L38.722 47.3961L55.7635 52.8126L55.8738 52.8474L55.9765 52.7701L86.6236 29.6409L53.8123 67.0293Z" fill="#36A368" stroke="url(#paint4_linear_12469_103976)" stroke-width="0.438652"/>
<path d="M6.66393 133.765C5.47487 133.765 4.44588 133.582 3.57696 133.217C2.70804 132.851 2.03184 132.312 1.54838 131.6C1.07145 130.881 0.823191 130.002 0.803591 128.963H3.71416C3.74029 129.46 3.88076 129.881 4.13555 130.228C4.39035 130.567 4.73335 130.825 5.16454 131.002C5.59574 131.172 6.089 131.257 6.64433 131.257C7.18005 131.257 7.64718 131.178 8.04571 131.021C8.45077 130.865 8.76437 130.646 8.9865 130.365C9.20863 130.084 9.3197 129.761 9.3197 129.395C9.3197 129.061 9.2217 128.781 9.0257 128.552C8.83623 128.323 8.55204 128.127 8.17311 127.964C7.80071 127.801 7.33685 127.657 6.78152 127.533L5.19394 127.141C3.91342 126.84 2.92037 126.366 2.21478 125.72C1.51572 125.066 1.16619 124.211 1.16619 123.152C1.16619 122.27 1.40138 121.499 1.87178 120.839C2.34871 120.179 2.99877 119.667 3.82196 119.301C4.65168 118.928 5.60227 118.742 6.67373 118.742C7.75825 118.742 8.7023 118.928 9.50589 119.301C10.316 119.673 10.9465 120.193 11.3973 120.859C11.8481 121.525 12.0833 122.3 12.1029 123.182H9.2217C9.16943 122.574 8.91463 122.1 8.45731 121.761C8.00651 121.421 7.40545 121.251 6.65413 121.251C6.15106 121.251 5.7166 121.326 5.35074 121.476C4.98488 121.62 4.70395 121.823 4.50795 122.084C4.31848 122.339 4.22375 122.633 4.22375 122.966C4.22375 123.312 4.32502 123.603 4.52755 123.838C4.73661 124.067 5.02081 124.26 5.38014 124.416C5.746 124.567 6.15433 124.694 6.60513 124.799L7.93791 125.122C8.5847 125.266 9.17596 125.458 9.71169 125.7C10.254 125.935 10.7211 126.223 11.1131 126.562C11.5051 126.902 11.8056 127.304 12.0147 127.768C12.2237 128.232 12.3283 128.761 12.3283 129.355C12.3283 130.251 12.1029 131.031 11.6521 131.698C11.2013 132.357 10.5545 132.867 9.71169 133.226C8.8689 133.586 7.85298 133.765 6.66393 133.765ZM14.396 133.55V118.948H20.1094C21.2135 118.948 22.1576 119.157 22.9415 119.575C23.7255 119.987 24.3233 120.562 24.7349 121.3C25.1531 122.032 25.3621 122.881 25.3621 123.848C25.3621 124.815 25.1498 125.664 24.7251 126.396C24.307 127.128 23.7027 127.699 22.9121 128.111C22.1216 128.522 21.1678 128.728 20.0506 128.728H16.2972V126.288H19.6488C20.2368 126.288 20.7268 126.187 21.1188 125.984C21.5173 125.775 21.8146 125.488 22.0106 125.122C22.2066 124.756 22.3046 124.331 22.3046 123.848C22.3046 123.358 22.2066 122.933 22.0106 122.574C21.8146 122.215 21.5173 121.934 21.1188 121.731C20.7268 121.529 20.2335 121.427 19.639 121.427H17.3948V133.55H14.396ZM33.7508 133.756C32.4572 133.756 31.2943 133.458 30.2621 132.864C29.2298 132.269 28.4131 131.413 27.8121 130.296C27.2176 129.179 26.9203 127.833 26.9203 126.259C26.9203 124.678 27.2176 123.329 27.8121 122.211C28.4131 121.088 29.2298 120.228 30.2621 119.634C31.2943 119.039 32.4572 118.742 33.7508 118.742C35.0444 118.742 36.2041 119.039 37.2298 119.634C38.262 120.228 39.0754 121.088 39.67 122.211C40.271 123.329 40.5715 124.678 40.5715 126.259C40.5715 127.833 40.271 129.182 39.67 130.306C39.0754 131.423 38.262 132.279 37.2298 132.874C36.2041 133.462 35.0444 133.756 33.7508 133.756ZM33.7508 131.1C34.5087 131.1 35.1718 130.914 35.7402 130.541C36.3086 130.169 36.7496 129.623 37.0632 128.905C37.3833 128.179 37.5434 127.297 37.5434 126.259C37.5434 125.213 37.3833 124.328 37.0632 123.603C36.7496 122.878 36.3086 122.329 35.7402 121.957C35.1718 121.584 34.5087 121.398 33.7508 121.398C32.9995 121.398 32.3364 121.587 31.7614 121.966C31.193 122.339 30.7488 122.888 30.4287 123.613C30.1151 124.331 29.9583 125.213 29.9583 126.259C29.9583 127.297 30.1151 128.176 30.4287 128.895C30.7488 129.614 31.193 130.162 31.7614 130.541C32.3364 130.914 32.9995 131.1 33.7508 131.1ZM42.6981 133.55V118.948H46.0007L50.636 126.357C50.8516 126.703 51.077 127.092 51.3122 127.523C51.5474 127.948 51.7892 128.421 52.0374 128.944C52.2922 129.467 52.5437 130.035 52.792 130.649L52.4686 130.825C52.4294 130.303 52.3935 129.741 52.3608 129.14C52.3281 128.532 52.302 127.951 52.2824 127.395C52.2628 126.84 52.253 126.376 52.253 126.004V118.948H55.3008V133.55H51.9884L47.7843 126.837C47.5033 126.38 47.2289 125.919 46.9611 125.455C46.6997 124.985 46.4221 124.462 46.1281 123.887C45.8406 123.312 45.5042 122.643 45.1187 121.878L45.5303 121.8C45.5695 122.512 45.6054 123.191 45.6381 123.838C45.6773 124.478 45.7067 125.057 45.7263 125.573C45.7459 126.089 45.7557 126.507 45.7557 126.827V133.55H42.6981ZM63.2289 133.765C62.0398 133.765 61.0108 133.582 60.1419 133.217C59.273 132.851 58.5968 132.312 58.1133 131.6C57.6364 130.881 57.3882 130.002 57.3686 128.963H60.2791C60.3053 129.46 60.4457 129.881 60.7005 130.228C60.9553 130.567 61.2983 130.825 61.7295 131.002C62.1607 131.172 62.654 131.257 63.2093 131.257C63.745 131.257 64.2121 131.178 64.6107 131.021C65.0157 130.865 65.3293 130.646 65.5515 130.365C65.7736 130.084 65.8847 129.761 65.8847 129.395C65.8847 129.061 65.7867 128.781 65.5907 128.552C65.4012 128.323 65.117 128.127 64.7381 127.964C64.3657 127.801 63.9018 127.657 63.3465 127.533L61.7589 127.141C60.4784 126.84 59.4853 126.366 58.7797 125.72C58.0807 125.066 57.7312 124.211 57.7312 123.152C57.7312 122.27 57.9663 121.499 58.4367 120.839C58.9137 120.179 59.5637 119.667 60.3869 119.301C61.2166 118.928 62.1672 118.742 63.2387 118.742C64.3232 118.742 65.2673 118.928 66.0709 119.301C66.881 119.673 67.5114 120.193 67.9622 120.859C68.413 121.525 68.6482 122.3 68.6678 123.182H65.7867C65.7344 122.574 65.4796 122.1 65.0223 121.761C64.5715 121.421 63.9704 121.251 63.2191 121.251C62.716 121.251 62.2816 121.326 61.9157 121.476C61.5498 121.62 61.2689 121.823 61.0729 122.084C60.8834 122.339 60.7887 122.633 60.7887 122.966C60.7887 123.312 60.89 123.603 61.0925 123.838C61.3016 124.067 61.5858 124.26 61.9451 124.416C62.311 124.567 62.7193 124.694 63.1701 124.799L64.5029 125.122C65.1497 125.266 65.7409 125.458 66.2767 125.7C66.8189 125.935 67.286 126.223 67.678 126.562C68.07 126.902 68.3706 127.304 68.5796 127.768C68.7887 128.232 68.8932 128.761 68.8932 129.355C68.8932 130.251 68.6678 131.031 68.217 131.698C67.7662 132.357 67.1194 132.867 66.2767 133.226C65.4339 133.586 64.4179 133.765 63.2289 133.765ZM73.9598 118.948V133.55H70.961V118.948H73.9598Z" fill="#742750"/>
<path d="M82.9071 133.756C81.607 133.756 80.4408 133.458 79.4085 132.864C78.3828 132.269 77.5727 131.413 76.9781 130.296C76.3901 129.179 76.0962 127.833 76.0962 126.259C76.0962 124.678 76.3934 123.329 76.9879 122.211C77.5825 121.088 78.3959 120.228 79.4281 119.634C80.4604 119.039 81.62 118.742 82.9071 118.742C83.7433 118.742 84.5208 118.86 85.2394 119.095C85.9646 119.33 86.6049 119.673 87.1602 120.124C87.7156 120.575 88.1696 121.124 88.5224 121.77C88.8817 122.417 89.1169 123.152 89.228 123.975H86.1998C86.128 123.57 85.9973 123.208 85.8078 122.888C85.6184 122.567 85.3832 122.296 85.1023 122.074C84.8213 121.852 84.5012 121.685 84.1419 121.574C83.7825 121.457 83.3905 121.398 82.9659 121.398C82.1949 121.398 81.5188 121.591 80.9373 121.976C80.3624 122.362 79.9181 122.917 79.6045 123.642C79.2909 124.361 79.1341 125.233 79.1341 126.259C79.1341 127.297 79.2909 128.179 79.6045 128.905C79.9246 129.623 80.3722 130.169 80.9471 130.541C81.522 130.914 82.1949 131.1 82.9659 131.1C83.384 131.1 83.7727 131.041 84.1321 130.923C84.4914 130.806 84.8115 130.639 85.0925 130.424C85.3799 130.202 85.6184 129.93 85.8078 129.61C85.9973 129.29 86.1312 128.928 86.2096 128.522H89.2378C89.1463 129.235 88.934 129.904 88.6008 130.531C88.2741 131.159 87.8364 131.717 87.2876 132.207C86.7454 132.691 86.1051 133.07 85.3668 133.344C84.6351 133.618 83.8152 133.756 82.9071 133.756ZM97.7245 133.756C96.4309 133.756 95.268 133.458 94.2357 132.864C93.2035 132.269 92.3868 131.413 91.7858 130.296C91.1912 129.179 90.894 127.833 90.894 126.259C90.894 124.678 91.1912 123.329 91.7858 122.211C92.3868 121.088 93.2035 120.228 94.2357 119.634C95.268 119.039 96.4309 118.742 97.7245 118.742C99.0181 118.742 100.178 119.039 101.203 119.634C102.236 120.228 103.049 121.088 103.644 122.211C104.245 123.329 104.545 124.678 104.545 126.259C104.545 127.833 104.245 129.182 103.644 130.306C103.049 131.423 102.236 132.279 101.203 132.874C100.178 133.462 99.0181 133.756 97.7245 133.756ZM97.7245 131.1C98.4824 131.1 99.1455 130.914 99.7139 130.541C100.282 130.169 100.723 129.623 101.037 128.905C101.357 128.179 101.517 127.297 101.517 126.259C101.517 125.213 101.357 124.328 101.037 123.603C100.723 122.878 100.282 122.329 99.7139 121.957C99.1455 121.584 98.4824 121.398 97.7245 121.398C96.9732 121.398 96.3101 121.587 95.7351 121.966C95.1667 122.339 94.7225 122.888 94.4023 123.613C94.0887 124.331 93.9319 125.213 93.9319 126.259C93.9319 127.297 94.0887 128.176 94.4023 128.895C94.7225 129.614 95.1667 130.162 95.7351 130.541C96.3101 130.914 96.9732 131.1 97.7245 131.1ZM106.672 133.55V118.948H112.405C113.509 118.948 114.453 119.144 115.237 119.536C116.021 119.928 116.619 120.48 117.03 121.192C117.448 121.904 117.657 122.744 117.657 123.711C117.657 124.671 117.445 125.501 117.02 126.2C116.596 126.899 115.985 127.435 115.188 127.807C114.391 128.179 113.43 128.366 112.307 128.366H108.455V125.945H111.944C112.532 125.945 113.022 125.86 113.414 125.69C113.806 125.514 114.1 125.259 114.296 124.926C114.499 124.593 114.6 124.188 114.6 123.711C114.6 123.221 114.499 122.809 114.296 122.476C114.1 122.136 113.806 121.878 113.414 121.702C113.022 121.519 112.529 121.427 111.934 121.427H109.671V133.55H106.672ZM114.835 133.55L111.327 126.915H114.561L118.138 133.55H114.835ZM119.823 133.55V118.948H129.76V121.457H122.822V124.946H129.231V127.405H122.822V131.041H129.77V133.55H119.823Z" fill="#36A368"/>
<defs>
<linearGradient id="paint0_linear_12469_103976" x1="123.235" y1="4.01065" x2="70.99" y2="111.366" gradientUnits="userSpaceOnUse">
<stop stop-color="#9B5379"/>
<stop offset="1" stop-color="#612946"/>
</linearGradient>
<linearGradient id="paint1_linear_12469_103976" x1="100.51" y1="83.3424" x2="67.7455" y2="101.594" gradientUnits="userSpaceOnUse">
<stop stop-color="#743757"/>
<stop offset="0.470597" stop-color="#965A79"/>
<stop offset="1" stop-color="#642B48"/>
</linearGradient>
<linearGradient id="paint2_linear_12469_103976" x1="-29.6326" y1="-15.5104" x2="82.6958" y2="38.2175" gradientUnits="userSpaceOnUse">
<stop stop-color="#C68FAC"/>
<stop offset="1" stop-color="#793C5C"/>
</linearGradient>
<linearGradient id="paint3_linear_12469_103976" x1="92.7512" y1="87.792" x2="20.4874" y2="29.299" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B466A"/>
<stop offset="1" stop-color="#A46B89"/>
</linearGradient>
<linearGradient id="paint4_linear_12469_103976" x1="66.2102" y1="30.5479" x2="68.8296" y2="53.867" gradientUnits="userSpaceOnUse">
<stop stop-color="#A8BE84"/>
<stop offset="1" stop-color="#BCD298"/>
</linearGradient>
</defs>
</svg>
`,

    logo: () => `<svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62Z" fill="#742750"/>
<path d="M26.6083 47.0916L11.3882 30.0831L26.6083 34.7875L50.2363 14.522L26.6083 47.0916Z" fill="#36A368"/>
</svg>
`,

    notification: () => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.5551 16.4033L22.2367 14.2099C21.9451 13.7316 21.6884 12.8099 21.6884 12.2499V10.0683C21.6884 5.83327 18.2467 2.3916 14.0234 2.3916C9.78841 2.40327 6.34674 5.83327 6.34674 10.0683V12.2383C6.34674 12.7983 6.09007 13.7199 5.81007 14.1983L4.49174 16.3916C3.99007 17.2433 3.87341 18.2116 4.18841 19.0516C4.50341 19.9033 5.21507 20.5799 6.14841 20.8833C7.40841 21.3033 8.68007 21.6066 9.97507 21.8283C10.1034 21.8516 10.2317 21.8633 10.3601 21.8866C10.5234 21.9099 10.6984 21.9333 10.8734 21.9566C11.1767 22.0033 11.4801 22.0383 11.7951 22.0616C12.5301 22.1316 13.2767 22.1666 14.0234 22.1666C14.7584 22.1666 15.4934 22.1316 16.2167 22.0616C16.4851 22.0383 16.7534 22.0149 17.0101 21.9799C17.2201 21.9566 17.4301 21.9333 17.6401 21.8983C17.7684 21.8866 17.8967 21.8633 18.0251 21.8399C19.3317 21.6299 20.6267 21.3033 21.8867 20.8833C22.7851 20.5799 23.4734 19.9033 23.8001 19.0399C24.1267 18.1649 24.0334 17.2083 23.5551 16.4033ZM14.8751 11.6666C14.8751 12.1566 14.4784 12.5533 13.9884 12.5533C13.4984 12.5533 13.1017 12.1566 13.1017 11.6666V8.04994C13.1017 7.55994 13.4984 7.16327 13.9884 7.16327C14.4784 7.16327 14.8751 7.55994 14.8751 8.04994V11.6666Z" fill="#353046"/>
<path d="M17.3016 23.3449C16.8116 24.6983 15.5166 25.6666 14 25.6666C13.0783 25.6666 12.1683 25.2933 11.5266 24.6283C11.1533 24.2783 10.8733 23.8116 10.71 23.3333C10.8616 23.3566 11.0133 23.3683 11.1766 23.3916C11.445 23.4266 11.725 23.4616 12.005 23.4849C12.67 23.5433 13.3466 23.5783 14.0233 23.5783C14.6883 23.5783 15.3533 23.5433 16.0066 23.4849C16.2516 23.4616 16.4966 23.4499 16.73 23.4149C16.9166 23.3916 17.1033 23.3683 17.3016 23.3449Z" fill="#353046"/>
</svg>
`,
    calender: ({ isActive }) => isActive ? `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99219 4V7" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M18.0078 4V7" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M23 10.5V19C23 22 21.5 24 18 24H10C6.5 24 5 22 5 19V10.5C5 7.5 6.5 5.5 10 5.5H18C21.5 5.5 23 7.5 23 10.5Z" fill="white"/>
<path d="M23.0023 10.999H5" stroke="#4C4464" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14.4945 15.7002H14.5035" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2914 15.7002H10.3004" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2914 19.2998H10.3004" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
` : `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66406 1.66699V4.16699" stroke="#625982" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3359 1.66699V4.16699" stroke="#625982" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 7.08366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V7.08366C2.5 4.58366 3.75 2.91699 6.66667 2.91699H13.3333C16.25 2.91699 17.5 4.58366 17.5 7.08366Z" fill="white" stroke="#625982" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.502 7.5V14.1667C17.502 16.6667 16.252 18.3333 13.3353 18.3333H6.66862C3.75196 18.3333 2.50196 16.6667 2.50196 14.1667L2.5 7.5H17.502Z" fill="white" stroke="#625982" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4121 11.4167H10.4196" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.91209 11.4167H6.91957" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.91209 14.4167H6.91957" stroke="#625982" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    clockIn: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33073 17V3.66667C3.33073 2.74619 4.07692 2 4.9974 2H14.9974C15.9179 2 16.6641 2.74619 16.6641 3.66667V9.33301" stroke="#01B075" stroke-width="1.5" stroke-linecap="round"/>
<rect x="6.5" y="4.83301" width="2" height="2" rx="0.5" fill="#01B075"/>
<rect x="6.5" y="8.83301" width="2" height="2" rx="0.5" fill="#01B075"/>
<rect x="6.5" y="12.833" width="2" height="2" rx="0.5" fill="#01B075"/>
<rect x="11.5" y="4.83301" width="2" height="2" rx="0.5" fill="#01B075"/>
<rect x="11.5" y="8.83301" width="2" height="2" rx="0.5" fill="#01B075"/>
<path d="M12.5 16.333L12.5 12.8332L15.6963 12.8332" stroke="#01B075" stroke-width="1.5" stroke-linecap="round"/>
<path d="M16.6239 17.1043L13.0035 13.333" stroke="#01B075" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    clockOut: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12469_98038)">
<path d="M3.33073 17V3.66667C3.33073 2.74619 4.07692 2 4.9974 2H14.9974C15.9179 2 16.6641 2.74619 16.6641 3.66667V9.33301" stroke="#E43B3B" stroke-width="1.5" stroke-linecap="round"/>
<rect x="6.5" y="4.83301" width="2" height="2" rx="0.5" fill="#E43B3B"/>
<rect x="6.5" y="8.83301" width="2" height="2" rx="0.5" fill="#E43B3B"/>
<rect x="6.5" y="12.833" width="2" height="2" rx="0.5" fill="#E43B3B"/>
<rect x="11.5" y="4.83301" width="2" height="2" rx="0.5" fill="#E43B3B"/>
<rect x="11.5" y="8.83301" width="2" height="2" rx="0.5" fill="#E43B3B"/>
<path d="M16.6172 13.9854L16.6172 17.4851L13.4209 17.4851" stroke="#E43B3B" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12.4933 13.214L16.1136 16.9854" stroke="#E43B3B" stroke-width="1.5" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_12469_98038">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
`,
    eyeIcon: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3866 7.99995C10.3866 9.31995 9.31995 10.3866 7.99995 10.3866C6.67995 10.3866 5.61328 9.31995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C9.31995 5.61328 10.3866 6.67995 10.3866 7.99995Z" fill="white" stroke="#625982" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.9999 13.5133C10.3532 13.5133 12.5466 12.1266 14.0732 9.72665C14.6732 8.78665 14.6732 7.20665 14.0732 6.26665C12.5466 3.86665 10.3532 2.47998 7.9999 2.47998C5.64656 2.47998 3.45323 3.86665 1.92656 6.26665C1.32656 7.20665 1.32656 8.78665 1.92656 9.72665C3.45323 12.1266 5.64656 13.5133 7.9999 13.5133Z" stroke="#625982" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    attendenceIcon: () => `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_14377_101457)">
<circle cx="20.736" cy="20.7359" r="20.736" fill="#E5E1F4"/>
<rect x="5" y="12.0092" width="29.2127" height="29.2147" rx="3.072" fill="#978FB2"/>
<rect x="6.10222" y="11.293" width="28.8207" height="28.8228" rx="2.87603" fill="#978FB2" stroke="#625982" stroke-width="0.391945" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.97852 11.2933H32.0469C33.6353 11.2933 34.9229 12.5809 34.9229 14.1693V26.6176L34.834 39.9652C34.8234 41.5461 33.5389 42.8226 31.958 42.8226H8.88965C7.29377 42.8226 6.00304 41.523 6.01367 39.9271L6.10254 26.6185V14.1693C6.10254 12.5809 7.39013 11.2933 8.97852 11.2933Z" fill="#FDFDFF" stroke="#7B719D" stroke-width="0.391945" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.85" d="M6.29749 26.097H34.5015V34.3626L33.8993 43.097H6.19678L6.29749 34.3626V26.097Z" fill="#F0F0FF"/>
<ellipse cx="20.1383" cy="21.3289" rx="3.23207" ry="3.23187" fill="#36A368"/>
<path d="M20.1392 25.4514C21.089 25.4514 22.0172 25.6609 22.8623 26.0534C21.051 26.6147 19.7352 28.3035 19.7352 30.2992C19.7352 30.8695 19.8441 31.4142 20.0398 31.9152H16.0991C14.7604 31.915 13.6345 30.7929 14.1248 29.5473C14.4468 28.7295 14.9354 27.9778 15.5689 27.3443C16.781 26.1323 18.425 25.4515 20.1392 25.4514Z" fill="#625982"/>
<path d="M24.1768 27.1819C25.9617 27.1819 27.4091 28.6285 27.4092 30.4133C27.4092 32.1982 25.9618 33.6458 24.1768 33.6458C22.3919 33.6455 20.9453 32.1981 20.9453 30.4133C20.9454 28.6287 22.392 27.1821 24.1768 27.1819ZM25.9795 28.7737C25.7428 28.537 25.3597 28.5371 25.123 28.7737L23.5312 30.3645L23.1514 29.9856C22.9147 29.749 22.5316 29.749 22.2949 29.9856C22.0583 30.2222 22.0583 30.6054 22.2949 30.842L23.5312 32.0784L25.9795 29.6301C26.2161 29.3935 26.2161 29.0103 25.9795 28.7737Z" fill="#36A368"/>
</g>
<defs>
<clipPath id="clip0_14377_101457">
<rect width="40" height="40" rx="20" fill="white"/>
</clipPath>
</defs>
</svg>



`,

    remainderIcon: () => `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_14377_101474)">
<circle cx="20.736" cy="20.7359" r="20.736" fill="#E5E1F4"/>
<rect x="5.60156" y="13.7385" width="29.2127" height="29.2147" rx="3.072" fill="#978FB2"/>
<rect x="6.70378" y="13.0224" width="28.8207" height="28.8228" rx="2.87603" fill="#978FB2" stroke="#625982" stroke-width="0.391945" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.58008 13.0227H32.6484C34.2368 13.0227 35.5244 14.3103 35.5244 15.8987V27.843C35.5245 28.198 35.5828 28.5506 35.6963 28.887L39.4473 40.009C40.076 41.8732 38.689 43.804 36.7217 43.804H13.9932C12.759 43.8039 11.662 43.0164 11.2676 41.8469L6.85449 28.762C6.75465 28.4659 6.70414 28.1554 6.7041 27.843V15.8987C6.7041 14.3103 7.99169 13.0227 9.58008 13.0227Z" fill="#FDFDFF" stroke="#7B719D" stroke-width="0.391945" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.85" d="M6.99707 28.0002H35.3048L40.4993 44.7139H12.4993L6.99707 28.0002Z" fill="#F0F0FF"/>
<path d="M31.0056 30.1777C31.2422 29.9411 31.6258 29.9411 31.8625 30.1777C32.0992 30.4144 32.0992 30.798 31.8625 31.0346L29.414 33.483L28.1775 32.2466C27.9408 32.0099 27.9408 31.6263 28.1775 31.3897C28.4142 31.153 28.7978 31.153 29.0344 31.3897L29.414 31.7692L31.0056 30.1777Z" fill="#625982"/>
<path d="M11 22.9917C11 21.8918 11.9002 21.0002 13 21.0002C14.0998 21.0002 15 21.8918 15 22.9917C15 24.0963 14.1046 25.0002 13 25.0002C11.8954 25.0002 11 24.0963 11 22.9917Z" fill="#36A368"/>
<path d="M11.6807 31.3601C11.3399 30.1787 12.2265 29.0002 13.4561 29.0002C14.2793 29.0002 15.0033 29.5449 15.2314 30.3359L15.3193 30.6404C15.6601 31.8218 14.7735 33.0002 13.5439 33.0002C12.7207 33.0002 11.9967 32.4556 11.7686 31.6646L11.6807 31.3601Z" fill="#625982"/>
<path d="M19.6807 31.3601C19.3399 30.1787 20.2265 29.0002 21.4561 29.0002C22.2793 29.0002 23.0033 29.5449 23.2314 30.3359L23.3193 30.6404C23.6601 31.8218 22.7735 33.0002 21.5439 33.0002C20.7207 33.0002 19.9967 32.4556 19.7686 31.6646L19.6807 31.3601Z" fill="#36A368"/>
<path d="M19 22.9917C19 21.8918 19.9002 21.0002 21 21.0002C22.0998 21.0002 23 21.8918 23 22.9917C23 24.0963 22.1046 25.0002 21 25.0002C19.8954 25.0002 19 24.0963 19 22.9917Z" fill="#625982"/>
<path d="M27 22.9917C27 21.8918 27.9002 21.0002 29 21.0002C30.0998 21.0002 31 21.8918 31 22.9917C31 24.0963 30.1046 25.0002 29 25.0002C27.8954 25.0002 27 24.0963 27 22.9917Z" fill="#36A368"/>
<rect x="11.0781" y="13.7385" width="3.65158" height="3.65184" rx="1.82579" fill="url(#paint0_radial_14377_101474)"/>
<rect x="19.2969" y="13.7385" width="3.65158" height="3.65184" rx="1.82579" fill="url(#paint1_radial_14377_101474)"/>
<rect x="27.5234" y="13.7385" width="3.65158" height="3.65184" rx="1.82579" fill="url(#paint2_radial_14377_101474)"/>
<rect x="12.1803" y="11.1951" width="1.43385" height="4.17285" rx="0.716924" fill="url(#paint3_linear_14377_101474)" stroke="#625982" stroke-width="0.391945" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="20.4069" y="11.1951" width="1.43385" height="4.17285" rx="0.716924" fill="url(#paint4_linear_14377_101474)" stroke="#625982" stroke-width="0.391945" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="28.6178" y="11.1951" width="1.43385" height="4.17285" rx="0.716924" fill="url(#paint5_linear_14377_101474)" stroke="#625982" stroke-width="0.391945" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<radialGradient id="paint0_radial_14377_101474" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.9039 15.5644) rotate(90) scale(1.82592 1.82579)">
<stop stop-color="#4D4666"/>
<stop offset="1" stop-color="#3D394B"/>
</radialGradient>
<radialGradient id="paint1_radial_14377_101474" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.1227 15.5644) rotate(90) scale(1.82592 1.82579)">
<stop stop-color="#4D4666"/>
<stop offset="1" stop-color="#3D394B"/>
</radialGradient>
<radialGradient id="paint2_radial_14377_101474" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.3492 15.5644) rotate(90) scale(1.82592 1.82579)">
<stop stop-color="#4D4666"/>
<stop offset="1" stop-color="#3D394B"/>
</radialGradient>
<linearGradient id="paint3_linear_14377_101474" x1="12.8973" y1="14.6408" x2="12.8973" y2="17.3881" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#FF7A1F"/>
</linearGradient>
<linearGradient id="paint4_linear_14377_101474" x1="21.1238" y1="14.6408" x2="21.1238" y2="17.3881" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#FF7A1F"/>
</linearGradient>
<linearGradient id="paint5_linear_14377_101474" x1="29.3348" y1="14.6408" x2="29.3348" y2="17.3881" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#FF7A1F"/>
</linearGradient>
<clipPath id="clip0_14377_101474">
<rect width="41.472" height="41.472" rx="20.736" fill="white"/>
</clipPath>
</defs>
</svg>


`,

    leaveIcon: () => `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12469_98120)">
<circle cx="24" cy="24" r="24" fill="url(#paint0_linear_12469_98120)"/>
<rect x="5.6875" y="15.6213" width="35.0552" height="35.0576" rx="3.55556" fill="#978FB2"/>
<rect x="7.00807" y="14.7534" width="34.6016" height="34.604" rx="3.32874" fill="#978FB2" stroke="#625982" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.3955 14.4386H38.3398C40.1781 14.4388 41.668 15.9294 41.668 17.7677V32.2345C41.668 32.6584 41.7393 33.0793 41.8789 33.4796L46.2979 46.1515C47.0522 48.3151 45.4456 50.5763 43.1543 50.5763H15.6299C14.2141 50.5762 12.9536 49.6807 12.4873 48.3439L7.25195 33.3302C7.12916 32.978 7.06642 32.6075 7.06641 32.2345V17.7677C7.06641 15.9293 8.5571 14.4386 10.3955 14.4386Z" fill="white" stroke="#7B719D" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.44922 31.5753H41.3583L41.3583 32.2346C41.3584 32.633 41.4254 33.0285 41.5566 33.4047L45.975 46.0771C46.7807 48.3881 45.0651 50.8033 42.6176 50.8033H16.196C14.6866 50.8033 13.3417 49.8502 12.8414 48.4261L7.65016 33.6474C7.51716 33.2688 7.44922 32.8703 7.44922 32.469V31.5753Z" fill="#F0F0FF"/>
<path d="M23.3304 26.1445L22.9844 25.3518" stroke="#353046" stroke-width="0.888889" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.3086 38.9638L26.097 32.4851" stroke="#625982" stroke-width="0.888889" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6484 40.001C16.8693 39.8964 17.3178 39.6151 17.7977 39.3005C18.8917 38.5835 20.1486 38.4103 21.3176 38.9972C22.2704 39.4756 23.5449 39.5606 24.5084 39.1042L25.2412 38.757C26.0921 38.3539 27.0902 38.4143 27.8863 38.9172C28.7673 39.4736 29.8872 39.4842 30.7785 38.9444L32.157 38.1096" stroke="#625982" stroke-width="1.06667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.8032 29.8642C32.069 28.1823 30.6598 26.8456 28.8854 26.1481C27.1111 25.4507 25.117 25.4496 23.3418 26.1452C21.5666 26.8407 20.1557 28.176 19.4196 29.8571C18.6835 31.5382 18.6824 33.4276 19.4165 35.1095L32.8032 29.8642Z" fill="#36A368"/>
<path d="M27.1023 31.2157C26.5418 29.9317 25.8633 28.7556 25.2161 27.946C24.5688 27.1364 24.0057 26.7598 23.6508 26.8988C23.2959 27.0379 23.1781 27.6813 23.3234 28.6876C23.4687 29.6939 23.8652 30.9805 24.4257 32.2645L27.1023 31.2157Z" fill="#F3F3FF"/>
<rect x="12.2656" y="15.6213" width="4.3819" height="4.3822" rx="2.19095" fill="url(#paint1_radial_12469_98120)"/>
<rect x="22.1172" y="15.6213" width="4.3819" height="4.3822" rx="2.19095" fill="url(#paint2_radial_12469_98120)"/>
<rect x="31.9844" y="15.6213" width="4.3819" height="4.3822" rx="2.19095" fill="url(#paint3_radial_12469_98120)"/>
<rect x="13.5862" y="12.561" width="1.73731" height="5.02412" rx="0.868655" fill="url(#paint4_linear_12469_98120)" stroke="#625982" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="23.4456" y="12.561" width="1.73731" height="5.02412" rx="0.868655" fill="url(#paint5_linear_12469_98120)" stroke="#625982" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="33.2971" y="12.561" width="1.73731" height="5.02412" rx="0.868655" fill="url(#paint6_linear_12469_98120)" stroke="#625982" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<linearGradient id="paint0_linear_12469_98120" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
<stop stop-color="#E5E1F4"/>
<stop offset="1" stop-color="#C4BBE7"/>
</linearGradient>
<radialGradient id="paint1_radial_12469_98120" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.4566 17.8124) rotate(90) scale(2.1911 2.19095)">
<stop stop-color="#4D4666"/>
<stop offset="1" stop-color="#3D394B"/>
</radialGradient>
<radialGradient id="paint2_radial_12469_98120" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.3081 17.8124) rotate(90) scale(2.1911 2.19095)">
<stop stop-color="#4D4666"/>
<stop offset="1" stop-color="#3D394B"/>
</radialGradient>
<radialGradient id="paint3_radial_12469_98120" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(34.1753 17.8124) rotate(90) scale(2.1911 2.19095)">
<stop stop-color="#4D4666"/>
<stop offset="1" stop-color="#3D394B"/>
</radialGradient>
<linearGradient id="paint4_linear_12469_98120" x1="14.4549" y1="16.7043" x2="14.4549" y2="20.001" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#FF7A1F"/>
</linearGradient>
<linearGradient id="paint5_linear_12469_98120" x1="24.3142" y1="16.7043" x2="24.3142" y2="20.001" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#FF7A1F"/>
</linearGradient>
<linearGradient id="paint6_linear_12469_98120" x1="34.1658" y1="16.7043" x2="34.1658" y2="20.001" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#FF7A1F"/>
</linearGradient>
<clipPath id="clip0_12469_98120">
<rect width="48" height="48" rx="24" fill="white"/>
</clipPath>
</defs>
</svg>
`,

    requestIcon: () => `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12469_98143)">
<circle cx="24" cy="24" r="24" fill="#E5E1F4"/>
<path d="M10.0131 16.9516C9.57319 16.3607 9.58191 15.529 10.1028 15.0081C10.3767 14.7342 10.7532 14.5881 11.1402 14.6057L38.6824 15.8577C39.6842 15.9032 40.473 16.7287 40.473 17.7315V45.8793C40.5017 47.7386 42.0698 50.3239 43.4162 51.7483C43.9171 52.2781 44.0233 53.2163 43.5077 53.7319C43.3074 53.9322 43.0357 54.0448 42.7524 54.0448H13.7695C12.7335 54.0448 11.8937 53.205 11.8937 52.169V25.4655C11.8937 21.3127 11.6941 19.2093 10.0131 16.9516Z" fill="#978FB2"/>
<path d="M9.17805 14.5781H11.8471C12.6279 14.5781 13.2608 15.2111 13.2608 15.9918V24.0518C13.2608 24.8325 12.6279 25.4655 11.8471 25.4655H9.17805C6.17159 25.4655 3.73438 23.0283 3.73438 20.0218C3.73438 17.0153 6.17159 14.5781 9.17805 14.5781Z" fill="#978FB2"/>
<path d="M8.49805 14.8047H9.8584C12.3638 14.8047 14.3945 16.8364 14.3945 19.3418C14.3943 21.847 12.3636 23.8779 9.8584 23.8779H8.49805C5.99282 23.8779 3.96118 21.847 3.96094 19.3418C3.96094 16.8364 5.99267 14.8047 8.49805 14.8047Z" fill="#CFCCDC" stroke="#625982" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.10938 18.667H13.3316V23.1114C11.351 23.4604 9.74299 23.965 7.55382 23.5559C10.0427 23.5559 10.2205 18.667 7.10938 18.667Z" fill="#353046"/>
<g clip-path="url(#paint0_angular_12469_98143_clip_path)" data-figma-skip-parse="true"><g transform="matrix(-0.00714483 0 0 -0.00553223 14.1879 21.6458)"><foreignObject x="-1079.37" y="-1079.37" width="2158.73" height="2158.73"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(from 90deg,rgba(255, 255, 255, 1) 0deg,rgba(243, 243, 255, 1) 360deg);height:100%;width:100%;opacity:1"></div></foreignObject></g></g><path d="M14.8682 18.8867V23.877H9.33398C9.48529 23.7197 9.61325 23.53 9.7168 23.3242C9.99644 22.7682 10.1226 22.0472 10.0586 21.335C9.99436 20.6215 9.73751 19.8955 9.22656 19.3457C9.06462 19.1715 8.87837 19.0171 8.66797 18.8867H14.8682Z" data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.95294117927551270,&#34;g&#34;:0.95294117927551270,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.95294117927551270,&#34;g&#34;:0.95294117927551270,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:-14.289653778076172,&#34;m01&#34;:-5.8953487707888441e-13,&#34;m02&#34;:21.332750320434570,&#34;m10&#34;:-3.5369342003821469e-13,&#34;m11&#34;:-11.064460754394531,&#34;m12&#34;:27.178035736083984},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"/>
<g clip-path="url(#paint1_angular_12469_98143_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0.00353831 1.61002e-10 -2.43683e-10 0.00238054 11.1491 21.2909)"><foreignObject x="-1372.52" y="-1372.52" width="2745.05" height="2745.05"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(from 90deg,rgba(255, 255, 255, 1) 0deg,rgba(234, 234, 255, 1) 360deg);height:100%;width:100%;opacity:1"></div></foreignObject></g></g><path d="M14.8682 18.8867V23.877H9.33398C9.48529 23.7197 9.61325 23.53 9.7168 23.3242C9.99644 22.7682 10.1226 22.0472 10.0586 21.335C9.99436 20.6215 9.73751 19.8955 9.22656 19.3457C9.06462 19.1715 8.87837 19.0171 8.66797 18.8867H14.8682Z" data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.92000001668930054,&#34;g&#34;:0.92000001668930054,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.92000001668930054,&#34;g&#34;:0.92000001668930054,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:7.0766100883483887,&#34;m01&#34;:-4.8736671942606336e-07,&#34;m02&#34;:7.6108112335205078,&#34;m10&#34;:3.2200458122133568e-07,&#34;m11&#34;:4.7610721588134766,&#34;m12&#34;:18.910331726074219},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"/>
<path d="M14.8682 18.8867V23.877H9.33398C9.48529 23.7197 9.61325 23.53 9.7168 23.3242C9.99644 22.7682 10.1226 22.0472 10.0586 21.335C9.99436 20.6215 9.73751 19.8955 9.22656 19.3457C9.06462 19.1715 8.87837 19.0171 8.66797 18.8867H14.8682Z" stroke="#98DDB7" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.8682 18.8867V23.877H9.33398C9.48529 23.7197 9.61325 23.53 9.7168 23.3242C9.99644 22.7682 10.1226 22.0472 10.0586 21.335C9.99436 20.6215 9.73751 19.8955 9.22656 19.3457C9.06462 19.1715 8.87837 19.0171 8.66797 18.8867H14.8682Z" stroke="#625982" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M37.2959 14.8047C39.6759 14.8047 41.6053 16.7343 41.6055 19.1143V44.5215C41.6372 46.5812 41.8058 48.0789 42.2334 49.3545C42.6156 50.4948 43.2018 51.4447 44.0576 52.457H17.7891C15.4091 52.4568 13.4795 50.5274 13.4795 48.1475V24.1045C13.4795 21.725 13.4153 19.9903 13.0342 18.5098C12.6859 17.1567 12.0756 16.0253 11.0332 14.8047H37.2959Z" fill="#FDFDFF"/>
<path d="M37.2959 14.8047C39.6759 14.8047 41.6053 16.7343 41.6055 19.1143V44.5215C41.6372 46.5812 41.8058 48.0789 42.2334 49.3545C42.6156 50.4948 43.2018 51.4447 44.0576 52.457H17.7891C15.4091 52.4568 13.4795 50.5274 13.4795 48.1475V24.1045C13.4795 21.725 13.4153 19.9903 13.0342 18.5098C12.6859 17.1567 12.0756 16.0253 11.0332 14.8047H37.2959Z" stroke="#98DDB7" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M37.2959 14.8047C39.6759 14.8047 41.6053 16.7343 41.6055 19.1143V44.5215C41.6372 46.5812 41.8058 48.0789 42.2334 49.3545C42.6156 50.4948 43.2018 51.4447 44.0576 52.457H17.7891C15.4091 52.4568 13.4795 50.5274 13.4795 48.1475V24.1045C13.4795 21.725 13.4153 19.9903 13.0342 18.5098C12.6859 17.1567 12.0756 16.0253 11.0332 14.8047H37.2959Z" stroke="#625982" stroke-width="0.45364" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="14" y="34" width="27" height="18" fill="#F0F0FF"/>
<path d="M21.8672 34.8447H34.6672" stroke="#625982" stroke-width="1.06667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.8672 38.0439H34.6672" stroke="#625982" stroke-width="1.06667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.8672 41.2451H34.6672" stroke="#625982" stroke-width="1.06667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.8672 44.4443H34.6672" stroke="#625982" stroke-width="1.06667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28.263 30.5778C31.1964 30.5778 33.5964 28.1778 33.5964 25.2445C33.5964 22.3111 31.1964 19.9111 28.263 19.9111C25.3297 19.9111 22.9297 22.3111 22.9297 25.2445C22.9297 28.1778 25.3297 30.5778 28.263 30.5778Z" fill="#36A368"/>
<path d="M26.1328 25.4355L27.3906 26.6933L29.9106 24.1777" stroke="white" stroke-width="0.888889" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="paint0_angular_12469_98143_clip_path"><path d="M14.8682 18.8867V23.877H9.33398C9.48529 23.7197 9.61325 23.53 9.7168 23.3242C9.99644 22.7682 10.1226 22.0472 10.0586 21.335C9.99436 20.6215 9.73751 19.8955 9.22656 19.3457C9.06462 19.1715 8.87837 19.0171 8.66797 18.8867H14.8682Z"/></clipPath><clipPath id="paint1_angular_12469_98143_clip_path"><path d="M14.8682 18.8867V23.877H9.33398C9.48529 23.7197 9.61325 23.53 9.7168 23.3242C9.99644 22.7682 10.1226 22.0472 10.0586 21.335C9.99436 20.6215 9.73751 19.8955 9.22656 19.3457C9.06462 19.1715 8.87837 19.0171 8.66797 18.8867H14.8682Z"/></clipPath><clipPath id="clip0_12469_98143">
<rect width="48" height="48" rx="24" fill="white"/>
</clipPath>
</defs>
</svg>
`,

    dashboardIcon: ({ isActive }) => isActive ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4248 3.55383C11.355 2.81578 12.645 2.81575 13.5752 3.55383L19.9805 8.63586C20.6229 9.14583 20.9999 9.93759 21 10.7775V18.3038C21 19.7927 19.8377 21.0001 18.4043 21.0001H5.5957C4.16249 21 3.00108 19.7925 3.00098 18.3038L3 10.7775C3.00005 9.93758 3.37708 9.14585 4.01953 8.63586L10.4248 3.55383ZM17.1484 15.5997C16.0439 15.5997 15.1484 16.4952 15.1484 17.5997C15.1484 18.7043 16.0439 19.5997 17.1484 19.5997C18.253 19.5997 19.1484 18.7043 19.1484 17.5997C19.1484 16.4952 18.253 15.5997 17.1484 15.5997Z" fill="white"/>
</svg>
` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.7">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4248 3.55367C11.355 2.81562 12.645 2.81559 13.5752 3.55367L19.9805 8.6357C20.6229 9.14567 20.9999 9.93743 21 10.7773V18.3037C21 19.7925 19.8377 21 18.4043 21H5.5957C4.16249 20.9999 3.00108 19.7924 3.00098 18.3037L3 10.7773C3.00005 9.93742 3.37708 9.14569 4.01953 8.6357L10.4248 3.55367ZM17.1484 15.5996C16.0439 15.5996 15.1484 16.495 15.1484 17.5996C15.1484 18.7041 16.0439 19.5996 17.1484 19.5996C18.253 19.5996 19.1484 18.7041 19.1484 17.5996C19.1484 16.495 18.253 15.5996 17.1484 15.5996Z" fill="white"/>
</g>
</svg>


`,

    profileIcon: ({ isActive }) => isActive ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1904 2.16992C19.83 2.17009 21.9998 4.33989 22 7.97949V16.3604C21.9999 19.1695 20.7104 21.0988 18.4414 21.8291C18.0905 19.19 15.332 17.1408 12.0029 17.1406C8.67316 17.1406 5.9128 19.1903 5.5625 21.8301H5.55957C3.28989 21.1 2.00013 19.17 2 16.3604V7.97949C2.00017 4.33989 4.16997 2.17009 7.80957 2.16992H16.1904ZM12.002 8.16992C10.022 8.16992 8.42188 9.77 8.42188 11.75C8.42191 13.73 10.022 15.3398 12.002 15.3398C13.9819 15.3398 15.582 13.7299 15.582 11.75C15.582 9.77003 13.9819 8.16996 12.002 8.16992Z" fill="white"/>
</svg>
` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.7">
<path d="M16.1904 2.16992C19.83 2.17009 21.9998 4.33989 22 7.97949V16.3604C21.9999 19.1695 20.7104 21.0988 18.4414 21.8291C18.0905 19.19 15.332 17.1408 12.0029 17.1406C8.67316 17.1406 5.9128 19.1903 5.5625 21.8301H5.55957C3.28989 21.1 2.00013 19.17 2 16.3604V7.97949C2.00017 4.33989 4.16997 2.17009 7.80957 2.16992H16.1904ZM12.002 8.16992C10.022 8.16992 8.42188 9.77 8.42188 11.75C8.42191 13.73 10.022 15.3398 12.002 15.3398C13.9819 15.3398 15.582 13.7299 15.582 11.75C15.582 9.77003 13.9819 8.16996 12.002 8.16992Z" fill="white"/>
</g>
</svg>


`,
    taskIcon: ({ isActive }) => isActive ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.375 5.25C15.375 7.11396 16.886 8.625 18.75 8.625H21V17.625C21 19.489 19.489 21 17.625 21H6.375C4.51104 21 3 19.489 3 17.625V6.375C3 4.51104 4.51104 3 6.375 3H15.375V5.25ZM14.8838 9.65137C14.4769 9.24446 13.8171 9.24446 13.4102 9.65137L10.6738 12.3877L10.0205 11.7344C9.61369 11.328 8.95469 11.328 8.54785 11.7344C8.14092 12.1413 8.14092 12.8011 8.54785 13.208L10.6738 15.334L14.8838 11.124C15.2904 10.7172 15.2903 10.0582 14.8838 9.65137ZM20.4375 7.5H18.75C17.5074 7.5 16.5 6.49264 16.5 5.25V3.5625L20.4375 7.5Z" fill="white"/>
</svg>
` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.7">
<path d="M15.375 5.25C15.375 7.11396 16.886 8.625 18.75 8.625H21V17.625C21 19.489 19.489 21 17.625 21H6.375C4.51104 21 3 19.489 3 17.625V6.375C3 4.51104 4.51104 3 6.375 3H15.375V5.25ZM14.8838 9.65137C14.4769 9.24446 13.8171 9.24446 13.4102 9.65137L10.6738 12.3877L10.0205 11.7344C9.61369 11.328 8.95469 11.328 8.54785 11.7344C8.14092 12.1413 8.14092 12.8011 8.54785 13.208L10.6738 15.334L14.8838 11.124C15.2904 10.7172 15.2903 10.0582 14.8838 9.65137ZM20.4375 7.5H18.75C17.5074 7.5 16.5 6.49264 16.5 5.25V3.5625L20.4375 7.5Z" fill="white"/>
</g>
</svg>


`,
    moreIcon: ({ isActive }) => !isActive ? `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.7">
<path d="M13.5518 17.6647H19.5706" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
<path d="M16.5708 14.6599L16.5708 20.6787" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
<circle cx="7.03463" cy="6.61129" r="3.61129" fill="white"/>
<circle cx="7.03463" cy="17.3888" r="3.61129" fill="white"/>
<circle cx="16.9658" cy="6.61129" r="3.61129" fill="white"/>
</g>
</svg>

` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5518 17.6647H19.5706" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
<path d="M16.5708 14.6599L16.5708 20.6787" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
<circle cx="7.03463" cy="6.61129" r="3.61129" fill="white"/>
<circle cx="7.03463" cy="17.3888" r="3.61129" fill="white"/>
<circle cx="16.9658" cy="6.61129" r="3.61129" fill="white"/>
</svg>


`,
    exitIcon: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5835 6.29995C12.3252 3.29995 10.7835 2.07495 7.4085 2.07495H7.30016C3.57516 2.07495 2.0835 3.56662 2.0835 7.29162V12.725C2.0835 16.45 3.57516 17.9416 7.30016 17.9416H7.4085C10.7585 17.9416 12.3002 16.7333 12.5752 13.7833" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3335 10H7.60016" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.4585 7.20837L6.66683 10L9.4585 12.7917" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    addIcon: ({ isActive }) => isActive ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6V18" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M18 12L6 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>



` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6V18" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
<path d="M18 12L6 12" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    policies: ({ isActive }) => isActive ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2168 8.17451H22.9991V5.30543C22.9991 5.30543 22.9991 2.43634 20.608 2.43634" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.6164 2.43634H6.92188C4.71274 2.43634 2.92188 4.2272 2.92188 6.43634V16.7818L15.3559 21.5636C16.9406 21.5636 18.2253 20.2789 18.2253 18.6942V7.69633C18.2253 5.78361 18.2253 2.91452 20.6164 2.43634Z" fill="white" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.00007 16.7818H12.9558C12.98 19.361 13.434 21.0854 15.3469 21.5636H3.39121C1.39106 20.5951 0.993973 19.4321 1.00007 16.7818Z" fill="#4C4464" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.97656 13.1954H14.15" stroke="#4C4464" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4883 5.52954C10.5677 5.51665 10.6495 5.52241 10.7266 5.5481L12.5186 6.14575C12.77 6.22963 12.9121 6.49548 12.8428 6.75122L12.2461 8.9436C12.2143 9.06007 12.1415 9.16082 12.041 9.22778L10.8457 10.0247C10.6778 10.1366 10.459 10.1366 10.291 10.0247L9.0957 9.22778C8.99535 9.16089 8.92244 9.05994 8.89062 8.9436L8.29102 6.7522C8.22107 6.49613 8.3634 6.22968 8.61523 6.14575L10.4102 5.5481L10.4883 5.52954Z" stroke="#4C4464" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2168 8.17451H22.9991V5.30543C22.9991 5.30543 22.9991 2.43634 20.608 2.43634" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.6164 2.43634H6.92188C4.71274 2.43634 2.92188 4.2272 2.92188 6.43634V16.7818L15.3559 21.5636C16.9406 21.5636 18.2253 20.2789 18.2253 18.6942V7.69633C18.2253 5.78361 18.2253 2.91452 20.6164 2.43634Z" fill="white" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.00007 16.7818H12.9558C12.98 19.361 13.434 21.0854 15.3469 21.5636H3.39121C1.39106 20.5951 0.993973 19.4321 1.00007 16.7818Z" fill="#353046" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.97656 13.1954H14.15" stroke="#4C4464" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4883 5.52954C10.5677 5.51665 10.6495 5.52241 10.7266 5.5481L12.5186 6.14575C12.77 6.22963 12.9121 6.49548 12.8428 6.75122L12.2461 8.9436C12.2143 9.06007 12.1415 9.16082 12.041 9.22778L10.8457 10.0247C10.6778 10.1366 10.459 10.1366 10.291 10.0247L9.0957 9.22778C8.99535 9.16089 8.92244 9.05994 8.89062 8.9436L8.29102 6.7522C8.22107 6.49613 8.3634 6.22968 8.61523 6.14575L10.4102 5.5481L10.4883 5.52954Z" stroke="#4C4464" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    settings: () => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0867 4.51831C12.559 2.4939 15.441 2.4939 15.9133 4.51831L16.0163 4.95952C16.3219 6.26969 17.8243 6.89198 18.9669 6.1817L19.3516 5.94251C21.1171 4.84501 23.155 6.8829 22.0575 8.64836L21.8183 9.03313C21.108 10.1757 21.7303 11.6781 23.0405 11.9837L23.4817 12.0867C25.5061 12.559 25.5061 15.441 23.4817 15.9133L23.0405 16.0163C21.7303 16.3219 21.108 17.8243 21.8183 18.9669L22.0575 19.3516C23.155 21.1171 21.1171 23.155 19.3516 22.0575L18.9669 21.8183C17.8243 21.108 16.3219 21.7303 16.0163 23.0405L15.9133 23.4817C15.441 25.5061 12.559 25.5061 12.0867 23.4817L11.9837 23.0405C11.6781 21.7303 10.1757 21.108 9.03313 21.8183L8.64836 22.0575C6.8829 23.155 4.84501 21.1171 5.94251 19.3516L6.1817 18.9669C6.89198 17.8243 6.26969 16.3219 4.95952 16.0163L4.51831 15.9133C2.4939 15.441 2.4939 12.559 4.51831 12.0867L4.95952 11.9837C6.26969 11.6781 6.89198 10.1757 6.1817 9.03313L5.94251 8.64836C4.84501 6.8829 6.8829 4.84501 8.64836 5.94251L9.03313 6.1817C10.1757 6.89198 11.6781 6.26969 11.9837 4.95952L12.0867 4.51831Z" fill="white"/>
<circle cx="13.9991" cy="14.0001" r="2.44444" stroke="#4C4464" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    travelIcon: ({ isActive }) => isActive ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2C10 1.44772 10.4477 1 11 1H13C13.5523 1 14 1.44772 14 2V6H10V2Z" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M8.5 22.5833C8.5 22.2612 8.76117 22 9.08333 22C9.4055 22 9.66667 22.2612 9.66667 22.5833C9.66667 22.9055 9.4055 23.1667 9.08333 23.1667C8.76117 23.1667 8.5 22.9055 8.5 22.5833Z" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M14.3359 22.5833C14.3359 22.2612 14.5971 22 14.9193 22C15.2414 22 15.5026 22.2612 15.5026 22.5833C15.5026 22.9055 15.2414 23.1667 14.9193 23.1667C14.5971 23.1667 14.3359 22.9055 14.3359 22.5833Z" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M17 4.49902C18.1046 4.49902 19 5.39445 19 6.49902V19.999C19 21.1036 18.1046 21.999 17 21.999H7C5.89543 21.999 5 21.1036 5 19.999V6.49902C5 5.39445 5.89543 4.49902 7 4.49902H17ZM9.66797 12.5488C9.28152 12.549 8.96875 12.8625 8.96875 13.249V19.082C8.96875 19.4685 9.28152 19.7811 9.66797 19.7812C10.0546 19.7812 10.3682 19.4686 10.3682 19.082V13.249C10.3682 12.8624 10.0546 12.5488 9.66797 12.5488ZM14.335 8.46582C13.9485 8.46582 13.6359 8.77859 13.6357 9.16504V19.082C13.6357 19.4686 13.9484 19.7812 14.335 19.7812C14.7216 19.7812 15.0342 19.4686 15.0342 19.082V9.16504C15.034 8.77859 14.7215 8.46582 14.335 8.46582Z" fill="white"/>
</svg>
` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.7">
<path d="M10.0137 2.00018C10.0137 1.4479 10.4614 1.00018 11.0137 1.00018H12.9838C13.5361 1.00018 13.9838 1.4479 13.9838 2.00018V5.96259H10.0137V2.00018Z" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M8.52148 22.4209C8.52148 22.1012 8.78072 21.842 9.10047 21.842C9.42021 21.842 9.67945 22.1012 9.67945 22.4209C9.67945 22.7407 9.42021 22.9999 9.10047 22.9999C8.78072 22.9999 8.52148 22.7407 8.52148 22.4209Z" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M14.3184 22.4209C14.3184 22.1012 14.5776 21.842 14.8973 21.842C15.2171 21.842 15.4763 22.1012 15.4763 22.4209C15.4763 22.7407 15.2171 22.9999 14.8973 22.9999C14.5776 22.9999 14.3184 22.7407 14.3184 22.4209Z" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M16.9482 4.47479C18.0528 4.47479 18.9482 5.37022 18.9482 6.47479V19.843C18.9482 20.9475 18.0528 21.843 16.9482 21.843H7.05273C5.94817 21.843 5.05273 20.9475 5.05273 19.843V6.47479C5.05273 5.37022 5.94816 4.47479 7.05273 4.47479H16.9482ZM9.69238 12.465C9.30867 12.465 8.99805 12.7757 8.99805 13.1594V18.9484C8.99808 19.3321 9.30869 19.6428 9.69238 19.6428C10.076 19.6427 10.3867 19.3321 10.3867 18.9484V13.1594C10.3867 12.7757 10.0761 12.4651 9.69238 12.465ZM14.3242 8.41229C13.9405 8.41229 13.6299 8.72294 13.6299 9.10663V18.9484C13.6299 19.3321 13.9405 19.6428 14.3242 19.6428C14.7079 19.6427 15.0185 19.3321 15.0186 18.9484V9.10663C15.0186 8.72296 14.7079 8.41234 14.3242 8.41229Z" fill="white"/>
</g>
</svg>
`,

    internetIcon: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12469_104031)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.49073 0.354968C4.75117 0.861699 3.20472 1.88096 2.05314 3.27979C0.901563 4.67861 0.198318 6.39204 0.0351562 8.19654H4.14944C4.38927 5.45057 5.18543 2.78214 6.48944 0.353682L6.49073 0.354968ZM4.14944 9.80368H0.0351562C0.197979 11.6082 0.900923 13.3218 2.05228 14.7209C3.20363 16.12 4.74993 17.1395 6.48944 17.6465C5.18543 15.2181 4.38927 12.5497 4.14944 9.80368ZM8.55173 17.9898C6.9929 15.5175 6.03719 12.7134 5.76173 9.80368H12.2353C11.9598 12.7134 11.0041 15.5175 9.4453 17.9898C9.14763 18.0046 8.8494 18.0046 8.55173 17.9898ZM11.5089 17.6453C13.2482 17.1383 14.7944 16.1189 15.9457 14.7201C17.097 13.3213 17.8001 11.608 17.9632 9.80368H13.8489C13.609 12.5497 12.8129 15.2181 11.5089 17.6465V17.6453ZM13.8489 8.19654H17.9632C17.8003 6.39197 17.0974 4.67838 15.946 3.27932C14.7947 1.88027 13.2484 0.860713 11.5089 0.353682C12.8129 2.78214 13.609 5.45057 13.8489 8.19654ZM8.55173 0.0103963C8.84983 -0.00444198 9.14848 -0.00444198 9.44659 0.0103963C11.005 2.4828 11.9602 5.28696 12.2353 8.19654H5.76301C6.04201 5.26897 6.99987 2.46225 8.55173 0.0103963Z" fill="#625982"/>
</g>
<defs>
<clipPath id="clip0_12469_104031">
<rect width="18" height="18" fill="white"/>
</clipPath>
</defs>
</svg>
`,
    instaIcon: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="18" height="18" rx="4" fill="#625982"/>
<path d="M5.72803 9.71484C5.72803 7.85088 7.23907 6.33984 9.10303 6.33984C10.967 6.33984 12.478 7.85088 12.478 9.71484C12.478 11.5788 10.967 13.0898 9.10303 13.0898C7.23907 13.0898 5.72803 11.5788 5.72803 9.71484Z" stroke="white" stroke-width="1.2"/>
<circle cx="14.1655" cy="5.21484" r="1.125" fill="white"/>
</svg>

`,
    likedInIcon: () => `

<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="18" height="18" rx="4" fill="#625982"/>
<path d="M3.27197 6.21875H5.72652V13.9084H3.27197V6.21875Z" fill="white"/>
<path d="M7.36279 6.21875H9.81734V13.9084H7.36279V6.21875Z" fill="white"/>
<path d="M9.81738 8.59009V6.95372C11.0872 5.6839 13.2013 5.89324 14.1974 7.38743L14.2384 7.44884C14.5566 7.92624 14.7265 8.48717 14.7265 9.06094V13.9083H12.2719V8.59009L12.1986 8.38849C11.7669 7.20137 10.0433 7.34729 9.81738 8.59009Z" fill="white"/>
<circle cx="4.49925" cy="4.49925" r="1.22727" fill="white"/>
</svg>

`,
    checkbox: ({ isActive }) => !isActive ? (`<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="2" width="15" height="15" rx="3.5" fill="white" stroke="#D9D9D9"/>
</svg>

`) : (`<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="2" width="16" height="16" rx="4" fill="#36A368"/>
<path d="M12.4688 5.84961C12.6699 5.84961 12.789 6.0837 12.6602 6.24414L12.6592 6.24316L6.9375 13.4961H6.93652C6.7256 13.7609 6.32265 13.7619 6.1123 13.4961L2.90234 9.42969C2.77666 9.27029 2.89024 9.0353 3.09375 9.03516H3.91309L4.03027 9.04883C4.06878 9.05769 4.10681 9.07051 4.14258 9.08789C4.21376 9.12255 4.2762 9.17315 4.3252 9.23535L6.52344 12.0215L11.2383 6.0498C11.3373 5.92341 11.4895 5.84973 11.6494 5.84961H12.4688Z" fill="white" stroke="white" stroke-width="0.3"/>
</svg>
`),
    messageIcon: () => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.5551 16.4033L22.2367 14.2099C21.9451 13.7316 21.6884 12.8099 21.6884 12.2499V10.0683C21.6884 5.83327 18.2467 2.3916 14.0234 2.3916C9.78841 2.40327 6.34674 5.83327 6.34674 10.0683V12.2383C6.34674 12.7983 6.09007 13.7199 5.81007 14.1983L4.49174 16.3916C3.99007 17.2433 3.87341 18.2116 4.18841 19.0516C4.50341 19.9033 5.21507 20.5799 6.14841 20.8833C7.40841 21.3033 8.68007 21.6066 9.97507 21.8283C10.1034 21.8516 10.2317 21.8633 10.3601 21.8866C10.5234 21.9099 10.6984 21.9333 10.8734 21.9566C11.1767 22.0033 11.4801 22.0383 11.7951 22.0616C12.5301 22.1316 13.2767 22.1666 14.0234 22.1666C14.7584 22.1666 15.4934 22.1316 16.2167 22.0616C16.4851 22.0383 16.7534 22.0149 17.0101 21.9799C17.2201 21.9566 17.4301 21.9333 17.6401 21.8983C17.7684 21.8866 17.8967 21.8633 18.0251 21.8399C19.3317 21.6299 20.6267 21.3033 21.8867 20.8833C22.7851 20.5799 23.4734 19.9033 23.8001 19.0399C24.1267 18.1649 24.0334 17.2083 23.5551 16.4033ZM14.8751 11.6666C14.8751 12.1566 14.4784 12.5533 13.9884 12.5533C13.4984 12.5533 13.1017 12.1566 13.1017 11.6666V8.04994C13.1017 7.55994 13.4984 7.16327 13.9884 7.16327C14.4784 7.16327 14.8751 7.55994 14.8751 8.04994V11.6666Z" fill="#353046"/>
<path d="M17.3016 23.3449C16.8116 24.6983 15.5166 25.6666 14 25.6666C13.0783 25.6666 12.1683 25.2933 11.5266 24.6283C11.1533 24.2783 10.8733 23.8116 10.71 23.3333C10.8616 23.3566 11.0133 23.3683 11.1766 23.3916C11.445 23.4266 11.725 23.4616 12.005 23.4849C12.67 23.5433 13.3466 23.5783 14.0233 23.5783C14.6883 23.5783 15.3533 23.5433 16.0066 23.4849C16.2516 23.4616 16.4966 23.4499 16.73 23.4149C16.9166 23.3916 17.1033 23.3683 17.3016 23.3449Z" fill="#353046"/>
</svg>
`,
    close: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7L7 17M17 17L7 7" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>


`,
    task: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.27734 6.66003H13.2148" stroke="#625982" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.78516 6.66003L5.34766 7.22253L7.03516 5.53503" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.27734 11.91H13.2148" stroke="#625982" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.78516 11.91L5.34766 12.4725L7.03516 10.785" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    event: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7502 15.1473L17.6801 14.2097C18.2312 13.6577 18.0513 13.0982 17.2863 12.9697L16.0902 12.7693C15.8878 12.7353 15.6478 12.5576 15.5578 12.3723L14.8979 11.0416C14.5417 10.3195 13.9567 10.3195 13.5968 11.0416M16.8214 16.9922C17.0314 17.9109 16.5477 18.2662 15.7415 17.7861L14.6204 17.1169C14.4179 16.996 14.0842 16.996 13.878 17.1169L12.7569 17.7861C11.9544 18.2662 11.467 17.9071 11.677 16.9922L11.9432 15.8316C11.9919 15.6123 11.9057 15.3061 11.7482 15.1473L10.8183 14.2097C10.2709 13.6577 10.4471 13.0982 11.212 12.9697L12.4081 12.7693" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.75 3V5.25" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.75 3V5.25" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.375 8.31738H16.125" stroke="#625982" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.75 18H6.75C4.125 18 3 16.5 3 14.25V7.875C3 5.625 4.125 4.125 6.75 4.125H12.75C15.375 4.125 16.5 5.625 16.5 7.875V9.75" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

    leave: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.57035 5.20596L9.21338 4.38818" stroke="#625982" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.741 18.4296L12.4276 11.7461" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.3332 9.04268C18.5758 7.30758 17.1219 5.9286 15.2913 5.20909C13.4607 4.48958 11.4034 4.48849 9.57194 5.20605C7.74051 5.92361 6.28496 7.30105 5.5255 9.03534C4.76604 10.7696 4.76489 12.7187 5.52229 14.4538L19.3332 9.04268Z" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.6665 19.4995C2.89233 19.3925 3.34891 19.1065 3.83917 18.7854C4.97607 18.0408 6.26904 17.8543 7.48362 18.464C8.4736 18.961 9.78563 19.0432 10.7867 18.569L11.5315 18.2162C12.4095 17.8003 13.4391 17.8627 14.2605 18.3814C15.1694 18.9555 16.3247 18.9664 17.2443 18.4095L18.6665 17.5483" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    request: () => `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2778 6.87543V11.9943V14.5004C17.2778 16.7096 15.4869 18.5004 13.2778 18.5004H7.5C5.29086 18.5004 3.5 16.7096 3.5 14.5004V8.72266C3.5 6.51352 5.29086 4.72266 7.5 4.72266H10.7716H14.6944" stroke="#4C4464" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.9098 4.77536L17.0689 6.83252M16.5312 3L18.9302 5.23925L11.6971 12.9882L9.00847 13.464L9.29816 10.749L16.5312 3Z" stroke="#36A368" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    timer: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3307 10.0003C18.3307 14.6003 14.5974 18.3337 9.9974 18.3337C5.3974 18.3337 1.66406 14.6003 1.66406 10.0003C1.66406 5.40033 5.3974 1.66699 9.9974 1.66699C14.5974 1.66699 18.3307 5.40033 18.3307 10.0003Z" fill="white" stroke="#4C4464" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.0953 12.6505L10.512 11.1088C10.062 10.8421 9.69531 10.2005 9.69531 9.67546V6.25879" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    meal: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.69531 11.1537L2.16064 10.6038C2.41451 10.3037 2.73878 10.0713 3.10444 9.92726C3.57302 9.74267 3.97089 9.41409 4.24074 8.98887L4.57387 8.46394C4.90374 7.94415 5.47659 7.62922 6.09222 7.62922C6.55171 7.62922 6.99378 7.45333 7.32767 7.13765L7.6277 6.85399C8.42722 6.09807 9.59182 5.87283 10.6155 6.27612L10.9642 6.41345C11.3143 6.5514 11.6874 6.62223 12.0637 6.62223H12.2329C13.1154 6.62223 13.9531 7.01075 14.5231 7.6844L14.8194 8.03458C15.1515 8.42708 15.5912 8.71384 16.0843 8.85952C16.6957 9.04016 17.2208 9.43634 17.5624 9.97463L18.3107 11.1537" stroke="#36A368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 11H19V14C19 16.7614 16.7614 19 14 19H6C3.23858 19 1 16.7614 1 14V11Z" fill="white" stroke="#4C4464" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.71505 1L9.64368 1.10705C9.30686 1.61228 9.33573 2.27739 9.71505 2.75154C10.0944 3.22569 10.1232 3.8908 9.78641 4.39603L9.71505 4.50308" stroke="#521C39" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5666 1L11.4952 1.10705C11.1584 1.61228 11.1873 2.27739 11.5666 2.75154C11.9459 3.22569 11.9748 3.8908 11.638 4.39603L11.5666 4.50308" stroke="#521C39" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.8713 1L7.79993 1.10705C7.46311 1.61228 7.49198 2.27739 7.8713 2.75154C8.25062 3.22569 8.27948 3.8908 7.94266 4.39603L7.8713 4.50308" stroke="#521C39" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    back: () => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.3359 21L9.9055 15.2374C9.14608 14.5568 9.14608 13.4432 9.9055 12.7626L16.3359 7" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    check: () => `<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.28906 2L3.78906 8L1.28906 5.27273" stroke="#36A368" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    headerclose: () => `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5 9L9 19.5" stroke="#36A368" stroke-width="1.4" stroke-linecap="round"/>
<path d="M19.5 19.5L9 9" stroke="#36A368" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    filter: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3344 3H4.07725C3.23933 3 2.77298 3.96874 3.29559 4.62371L8.54062 11.1971C8.56889 11.2325 8.58429 11.2765 8.58429 11.3218V15.9752C8.58429 16.3054 8.74732 16.6144 9.01995 16.8007L13.6042 19.9345C14.2679 20.3882 15.1686 19.913 15.1686 19.109V11.3284C15.1686 11.2791 15.1868 11.2315 15.2197 11.1948L21.0786 4.668C21.6565 4.02419 21.1996 3 20.3344 3Z" stroke="#4C4464" stroke-width="1.4" stroke-linecap="round"/>
<path d="M9.71875 6.85742H14.8627" stroke="#4C4464" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    checkOutfilled: () => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.87402 5.18652C10.8366 3.58061 13.1634 3.58061 14.126 5.18652C14.3703 5.59425 14.8534 5.79425 15.3145 5.67871C17.1307 5.22376 18.7762 6.86928 18.3213 8.68555C18.2057 9.14662 18.4057 9.6297 18.8135 9.87402C20.4194 10.8366 20.4194 13.1634 18.8135 14.126C18.4057 14.3703 18.2057 14.8534 18.3213 15.3145C18.7762 17.1307 17.1307 18.7762 15.3145 18.3213C14.8534 18.2057 14.3703 18.4057 14.126 18.8135C13.1634 20.4194 10.8366 20.4194 9.87402 18.8135C9.6297 18.4057 9.14662 18.2057 8.68555 18.3213C6.86928 18.7762 5.22376 17.1307 5.67871 15.3145C5.79425 14.8534 5.59425 14.3703 5.18652 14.126C3.58061 13.1634 3.58061 10.8366 5.18652 9.87402C5.59425 9.6297 5.79425 9.14662 5.67871 8.68555C5.22376 6.86928 6.86928 5.22376 8.68555 5.67871C9.14662 5.79425 9.6297 5.59425 9.87402 5.18652Z" stroke="#019E69" stroke-width="1.4"/>
<path d="M8.99951 12L11.1424 14L14.9995 10" stroke="#019E69" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,
    delete: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.61379 6.53256C4.57754 5.9567 5.03481 5.46973 5.61182 5.46973H14.3708C14.9478 5.46973 15.4051 5.9567 15.3688 6.53257L14.7688 16.062C14.7357 16.5888 14.2987 16.9991 13.7708 16.9991H6.21182C5.68393 16.9991 5.24697 16.5888 5.21379 16.062L4.61379 6.53256Z" stroke="#EF3336" stroke-width="1.4" stroke-linecap="round"/>
<path d="M3 5.46973H17" stroke="#EF3336" stroke-width="1.4" stroke-linecap="round"/>
<rect x="5.33594" y="3" width="9.33333" height="2.47059" rx="1" stroke="#EF3336" stroke-width="1.4" stroke-linecap="round"/>
</svg>
`,

    checkRounded: () => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 10C16.5 13.866 13.366 17 9.5 17C5.63401 17 2.5 13.866 2.5 10C2.5 6.13401 5.63401 3 9.5 3C10.5983 3 11.6375 3.25292 12.5625 3.7037M15.1875 5.625L9.0625 11.75L7.3125 10" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    sponsicoreMessageIcon: () => `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8676 40.3177C31.5654 40.3177 40.2376 31.8519 40.2376 21.4089C40.2376 10.9658 31.5654 2.5 20.8676 2.5C10.1698 2.5 1.49756 10.9658 1.49756 21.4089C1.49756 31.8519 10.1698 40.3177 20.8676 40.3177Z" fill="#742750"/>
<path d="M18.1225 31.2227L8.6123 20.8482L18.1225 23.7177L32.8861 11.3564L18.1225 31.2227Z" fill="#3CB473"/>
</svg>
`,
    geminiStar: () => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 4C9.87716 6.30358 11.6964 8.12284 14 9C11.6964 9.87716 9.87716 11.6964 9 14C8.12284 11.6964 6.30358 9.87716 4 9C6.30358 8.12284 8.12284 6.30358 9 4Z" fill="#0094FF"/>
</svg>
`
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: keyof typeof Icons;
    style?: React.CSSProperties;
    isActive?: boolean;
    size?: number;
    color?: string;
    wrapperStyle?: ViewStyle
};

export const Icon: React.FC<IconProps> = ({ name, size, ...props }) => {

    const finalSize = (size || 24) + (isTablet ? 10 : 0)

    const IconComponent = Icons[name];
    if (!IconComponent) return null;
    return <SvgXml
        // @ts-ignore
        xml={IconComponent({ isActive: props.isActive || false, color: COLORS.gray500 })}
        width={finalSize}
        height={finalSize}
        {...props}
    />
};
export const IconButton: React.FC<IconProps & { onPress?: () => void }> = ({ name, onPress, ...props }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={props.wrapperStyle}>
            <Icon name={name} {...props} />
        </TouchableOpacity>
    );
}