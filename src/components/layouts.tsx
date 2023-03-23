
import main_layout from './main_layout';
import front_layout from './front_layout';

export const Layouts = {
    Main: main_layout,
    Front: front_layout,
}

export type LayoutKeys = keyof typeof Layouts;