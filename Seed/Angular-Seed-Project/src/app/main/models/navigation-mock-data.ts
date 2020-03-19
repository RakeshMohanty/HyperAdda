import { Navigation } from './navigation.model';
export const NavigationData: Navigation[] = [
  {
    id: '1',
    title: 'Tools',
    icon: 'local_bar',
    route: '',
    children: [
      {
        id: '11',
        title: 'Content',
        icon: 'border_color',
        route: 'tools/content',
        children: null
      },
      {
        id: '12',
        title: 'Labsite Group',
        icon: 'photo_filter',
        route: 'tools/labsite-group',
        children: null
      }
    ]
  },
  {
    id: '2',
    title: 'Admin',
    icon: 'supervisor_account',
    route: '',
    children: [
      {
        id: '21',
        title: 'Luncher',
        icon: 'open_in_new',
        route: 'admin/launcher',
        children: null
      }
    ]
  },
  {
    id: '3',
    title: 'Examples of the menu item',
    icon: 'format_color_fill',
    route: '',
    children: [
      {
        id: '34',
        title: 'Grid-Expand',
        icon: 'format_list_bulleted',
        route: 'examples/expand-grid',
        children: null
      },
      {
        id: '31',
        title: 'Bootstrap uses media query',
        icon: 'format_bold',
        route: 'examples/bootstrap',
        children: null
      },
      {
        id: '12',
        title: 'Datatable',
        icon: 'view_comfy',
        route: 'examples/data-table',
        children: null
      },
      {
        id: '13',
        title: 'Datatable-DS',
        icon: 'format_list_bulleted',
        route: 'examples/data-table-ds',
        children: null
      },
      {
        id: '14',
        title: 'DataTable-Ux',
        icon: 'format_list_bulleted',
        route: 'examples/custom-grid',
        children: null
      },
      {
        id: '19',
        title: 'Expand Datatable',
        icon: 'format_list_bulleted',
        route: 'examples/expand-table',
        children: null
      },
      {
        id: '15',
        title: 'Internationalization',
        icon: 'merge_type',
        route: 'examples/i18n-demo',
        children: null
      },
      {
        id: '16',
        title: 'Image Viewer',
        icon: 'format_shapes',
        route: 'examples/image-preview',
        children: null
      },
      {
        id: '17',
        title: 'Template',
        icon: 'format_paint',
        route: 'examples/template-demo',
        children: null
      },
      {
        id: '18',
        title: 'Comp Life Cycle',
        icon: 'low_priority',
        route: 'examples/life-cycle-demo',
        children: null
      }
    ]
  },
  {
    id: '4',
    title: 'Concept',
    icon: 'bubble_chart',
    route: '',
    children: [
      {
        id: '41',
        title: 'Comp Interaction',
        icon: 'content_cut',
        route: 'concept/comp-int/app',
        children: null
      },
      {
        id: '43',
        title: 'Comp Style',
        icon: 'format_size',
        route: 'concept/comp-style/app',
        children: null
      },
      {
        id: '44',
        title: 'Dynamic Comp',
        icon: 'device_hub',
        route: 'concept/dynamic-comp/app',
        children: null
      },
      {
        id: '45',
        title: 'Attribute Dir',
        icon: 'linear_scale',
        route: 'concept/attribute-dir/app',
        children: null
      },
      {
        id: '46',
        title: 'Structural Dir',
        icon: 'multiline_chart',
        route: 'concept/structural-dir/app',
        children: null
      },
      {
        id: '46',
        title: 'Pipe',
        icon: 'settings_input_composite',
        route: 'concept/pipe-demo/app',
        children: null
      },
      {
        id: '46',
        title: 'Animations',
        icon: 'pets',
        route: 'concept/animations/app',
        children: null
      }
    ]
  },
  {
    id: '5',
    title: 'Forms',
    icon: 'inbox',
    route: '',
    children: [
      {
        id: '51',
        title: 'Template Forms',
        icon: 'format_textdirection_l_to_r',
        route: 'forms/template-forms/app',
        children: null
      },
      {
        id: '52',
        title: 'Reactive Forms',
        icon: 'format_textdirection_r_to_l',
        route: 'forms/reactive-forms/home',
        children: null
      },
      {
        id: '53',
        title: 'Material Forms',
        icon: 'format_line_spacing',
        route: 'forms/material-forms/app',
        children: null
      },
      {
        id: '54',
        title: 'Material Rx Forms',
        icon: 'format_list_numbered',
        route: 'forms/material-reactive-forms/app',
        children: null
      }
    ]
  },

  {
    id: '6',
    title: 'Framework',
    icon: 'gamepad',
    route: '',
    children: [
      {
        id: '61',
        title: 'Logger',
        icon: 'scanner',
        route: 'framework/logger-demo/home',
        children: null
      }
    ]
  }
];
