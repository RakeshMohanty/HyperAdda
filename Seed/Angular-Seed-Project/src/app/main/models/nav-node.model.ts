export class NavNode {
  Id: number;
  TranslationLabel: string;
  Route: string;
  Icon: string = null;
  Children: NavNode[];
  Expand?: boolean;
}
