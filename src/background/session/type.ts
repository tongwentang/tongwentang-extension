import type { MenuId } from '../../service/menu/create-menu';

export interface SessionState {
  menuId?: MenuId;
  hasBrowserActionMenu?: Promise<unknown>;
}
