import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgBell = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M544.79 62.968c35.314 2.673 68.09 10.044 98.327 22.114 38.84 15.503 69.682 35.312 92.529 59.428 22.847 24.115 40.362 49.461 52.547 76.038 12.185 26.576 18.278 52.415 18.278 77.515 0 261.827 69.48 451.58 204.529 599.227H656.873c-4.814 75.146-68.832 118.837-146.478 118.837-77.645 0-142.116-43.69-146.965-118.837H11.746c135.049-147.647 209.849-337.4 209.849-599.227 0-25.1 6.092-50.939 18.277-77.515 12.185-26.577 29.7-51.923 52.548-76.038 22.846-24.116 53.69-43.925 92.529-59.428 27.874-11.127 57.906-18.26 90.096-21.401a40.385 40.385 0 01-5.915-21.106C469.13 20.165 487.296 2 509.705 2c22.409 0 40.575 18.166 40.575 40.575 0 7.434-2 14.401-5.49 20.393zM391.884 897.29c3.036 54.248 55.483 85.837 118.768 85.837 63.286 0 115.36-31.589 118.374-85.837H391.884zm-311.69-34.636h863.708c-120.437-132.862-169.314-311.84-169.314-547.449 0-22.586-5.433-45.837-16.3-69.753-10.867-23.915-26.487-46.723-46.862-68.424-20.375-21.7-47.88-39.526-82.518-53.477-34.637-13.95-73.01-20.926-115.117-20.926-42.108 0-80.48 6.976-115.118 20.926-34.637 13.95-62.143 31.777-82.518 53.477-20.374 21.701-35.995 44.51-46.862 68.424-10.866 23.916-16.3 47.167-16.3 69.753 0 235.61-52.361 414.587-172.799 547.45z"
        id="bell_svg__path-1"
      />
    </Defs>
    <G
      id="bell_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="bell_svg__bell">
        <Mask id="bell_svg__mask-2" fill="#fff">
          <Use xlinkHref="#bell_svg__path-1" />
        </Mask>
        <Use
          id="bell_svg__Mask"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#bell_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgBell;
