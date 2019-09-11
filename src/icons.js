// Explicitly import used icons to keep bundle size small
//
// This file should be loaded by the app only once
//
// For more info see:
// https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faCircleNotch,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faCircleNotch, faExclamationTriangle);
