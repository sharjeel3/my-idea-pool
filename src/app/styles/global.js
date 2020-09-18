import { brandColors } from '../../ui-library/theme/colors';
import { reset } from './reset';

export const globalStyles = `
  ${reset}
  html, body {
    font-size: 16px;
    line-height: 1.125;
    font-family: Arial, Helvetica, sans-serif;
    color: ${brandColors.grey};
  }
  ::selection {
    background-color: ${brandColors.green};
    color: ${brandColors.white};
  }
  .overflow-hidden {
    &, body {
      overflow: hidden;
      position: relative;
    }
  }
`;
