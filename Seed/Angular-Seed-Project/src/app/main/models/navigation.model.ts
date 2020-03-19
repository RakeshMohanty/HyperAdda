export class Navigation {
  id: string;
  title: string;
  icon: string;
  route: string = null;
  children: Navigation[];
  expand?: boolean;
}

