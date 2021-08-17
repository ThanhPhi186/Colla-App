import {Colors, Mixin} from '.';
import {getBottomSpace} from '../helpers/iphoneXHelper';
import {FONT_SIZE_20} from './Typography';

export const NAVIGATION_BOTTOM_TABS_HEIGHT = 64 + getBottomSpace();
export const HEIGHT_MIDDLE_HOME_BTN = 70;

export const container = {
  flex: 1,
  backgroundColor: Colors.WHITE,
};

export const containerCenter = {
  flex: 1,
  backgroundColor: Colors.WHITE,
  alignItems: 'center',
  justifyContent: 'center',
};

export const viewRow = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const rowSpaceBetween = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const titleBold = {
  fontSize: FONT_SIZE_20,
  fontWeight: '600',
};

export const fontWeight600 = {
  fontWeight: '600',
};

export const fontWeightBold = {
  fontWeight: 'bold',
};
