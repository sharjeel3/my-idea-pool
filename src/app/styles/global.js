import { brandColors } from '../../ui-library/theme/colors';
import { reset } from './reset';

export const globalStyles = `
  ${reset}
  body {
    font-family: Arial, Helvetica, sans-serif;
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
