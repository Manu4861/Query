import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const Logo = ({ color }) => {
  return (
    <Svg
      width="104"
      height="32"
      viewBox="0 0 104 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3.40797 20.919C1.17196 18.579 0.0539648 15.81 0.0539648 12.612C0.0539648 9.414 1.18496 6.645 3.44697 4.305C5.70897 1.965 8.43897 0.794999 11.637 0.794999C14.835 0.794999 17.565 1.965 19.827 4.305C22.089 6.645 23.22 9.414 23.22 12.612C23.22 14.77 22.661 16.772 21.543 18.618C20.451 20.438 18.995 21.868 17.175 22.908C17.227 23.038 17.331 23.298 17.487 23.688C17.643 24.078 17.747 24.338 17.799 24.468C17.877 24.624 17.981 24.845 18.111 25.131C18.241 25.417 18.358 25.612 18.462 25.716C18.592 25.846 18.735 25.989 18.891 26.145C19.047 26.327 19.216 26.444 19.398 26.496C19.58 26.548 19.788 26.574 20.022 26.574C20.646 26.574 21.218 26.418 21.738 26.106C22.258 25.82 22.622 25.534 22.83 25.248L23.142 24.78L23.727 25.209C23.701 25.287 23.649 25.378 23.571 25.482C23.519 25.612 23.376 25.833 23.142 26.145C22.934 26.483 22.7 26.769 22.44 27.003C22.18 27.263 21.829 27.484 21.387 27.666C20.945 27.874 20.49 27.978 20.022 27.978C18.28 27.978 16.941 27.64 16.005 26.964C15.069 26.288 14.302 25.365 13.704 24.195C12.976 24.325 12.287 24.39 11.637 24.39C8.41297 24.39 5.66997 23.233 3.40797 20.919ZM13.119 22.908C12.885 22.362 12.703 21.985 12.573 21.777C12.469 21.543 12.3 21.257 12.066 20.919C11.832 20.581 11.572 20.347 11.286 20.217C11.026 20.087 10.714 20.022 10.35 20.022C9.30997 20.022 8.37397 20.295 7.54197 20.841C8.63397 22.323 10.051 23.064 11.793 23.064C12.339 23.064 12.781 23.012 13.119 22.908ZM16.044 20.802C17.318 18.982 17.955 16.356 17.955 12.924C17.955 11.182 17.76 9.531 17.37 7.971C16.98 6.411 16.278 5.046 15.264 3.876C14.25 2.706 12.989 2.121 11.481 2.121C10.311 2.121 9.30997 2.433 8.47797 3.057C7.64597 3.681 7.00897 4.513 6.56697 5.553C6.12496 6.593 5.79996 7.672 5.59196 8.79C5.40996 9.882 5.31896 11.052 5.31896 12.3C5.31896 15.29 5.85197 17.799 6.91797 19.827C7.93196 18.813 9.15396 18.306 10.584 18.306C13.028 18.306 14.848 19.138 16.044 20.802ZM43.8144 21.66C45.2184 21.764 46.0374 21.816 46.2714 21.816V22.713C45.7774 22.713 44.5814 22.999 42.6834 23.571C40.7854 24.117 39.5374 24.39 38.9394 24.39V23.259C37.6134 24.013 36.2874 24.39 34.9614 24.39C29.9434 24.39 27.4344 22.544 27.4344 18.852V8.439C27.2004 7.919 26.3814 7.659 24.9774 7.659V6.84H32.3094V19.125C32.3094 19.671 32.3094 20.1 32.3094 20.412C32.3354 20.698 32.4004 21.036 32.5044 21.426C32.6084 21.816 32.7514 22.115 32.9334 22.323C33.1414 22.531 33.4274 22.713 33.7914 22.869C34.1814 22.999 34.6494 23.064 35.1954 23.064C36.4694 23.064 37.7174 22.713 38.9394 22.011V8.439C38.7054 7.919 37.8864 7.659 36.4824 7.659V6.84H43.8144V21.66ZM53.1086 14.601C53.1606 16.863 53.6676 18.813 54.6296 20.451C55.6176 22.089 56.8656 22.908 58.3736 22.908C60.6356 22.908 62.4556 22.05 63.8336 20.334L64.7696 20.802C64.0156 22.05 63.0276 22.96 61.8056 23.532C60.6096 24.104 59.0236 24.39 57.0476 24.39C56.0336 24.39 55.0456 24.247 54.0836 23.961C53.1216 23.649 52.1596 23.155 51.1976 22.479C50.2616 21.777 49.4946 20.75 48.8966 19.398C48.3246 18.046 48.0386 16.434 48.0386 14.562C48.0386 12.3 48.8316 10.389 50.4176 8.829C52.0296 7.243 54.1096 6.45 56.6576 6.45C59.4396 6.45 61.5976 7.243 63.1316 8.829C64.6656 10.389 65.4326 12.313 65.4326 14.601H53.1086ZM53.1476 13.392H60.2456C60.0896 11.546 59.7646 10.129 59.2706 9.141C58.8026 8.127 58.0356 7.62 56.9696 7.62C56.0336 7.62 55.1886 8.101 54.4346 9.063C53.7066 9.999 53.2776 11.442 53.1476 13.392ZM67.3037 24V23.181C68.7077 23.181 69.5267 22.921 69.7607 22.401V9.18C68.3567 9.076 67.5377 9.024 67.3037 9.024V8.127C67.7977 8.127 68.9937 7.854 70.8917 7.308C72.7897 6.736 74.0377 6.45 74.6357 6.45V8.088C75.9877 6.996 77.2747 6.45 78.4967 6.45C81.7207 6.45 83.3327 7.23 83.3327 8.79C83.3327 9.414 83.1377 9.908 82.7477 10.272C82.3837 10.636 81.9287 10.818 81.3827 10.818C80.7847 10.818 80.3297 10.662 80.0177 10.35C79.7057 10.038 79.5107 9.687 79.4327 9.297C79.3547 8.907 79.1987 8.556 78.9647 8.244C78.7567 7.932 78.4447 7.776 78.0287 7.776C77.0407 7.776 75.9097 8.322 74.6357 9.414V22.401C74.8697 22.921 75.6887 23.181 77.0927 23.181V24H67.3037ZM92.1217 6.84V7.659C91.3677 7.659 90.8217 7.711 90.4837 7.815L95.1247 19.242L99.5707 8.088C99.2067 7.802 98.4787 7.659 97.3867 7.659V6.84H103.783V7.659C102.379 7.659 101.586 7.867 101.404 8.283L93.5257 27.978C92.6677 30.11 91.3027 31.176 89.4307 31.176C87.5327 31.176 86.5837 30.552 86.5837 29.304C86.5837 28.836 86.7267 28.459 87.0127 28.173C87.3247 27.887 87.7537 27.744 88.2997 27.744C88.7157 27.744 89.0797 27.939 89.3917 28.329C89.7037 28.719 90.0547 28.914 90.4447 28.914C90.9907 28.914 91.3547 28.68 91.5367 28.212L92.5507 25.716L85.6477 8.439C85.4137 7.919 84.5947 7.659 83.1907 7.659V6.84H92.1217Z"
        fill={color}
      />
    </Svg>
  );
};

export default Logo;