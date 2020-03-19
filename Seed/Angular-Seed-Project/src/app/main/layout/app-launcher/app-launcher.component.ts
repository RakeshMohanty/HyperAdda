import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavNode } from './../../models/nav-node.model';

@Component({
  selector: 'app-app-launcher',
  templateUrl: './app-launcher.component.html',
  styleUrls: ['./app-launcher.component.scss']
})
export class AppLauncherComponent implements OnInit {
  @Output() launcherOptionClicked = new EventEmitter<NavNode[]>();
  private _navNodes: NavNode[];
  selectedTabIndex = 0;
  leftIndex = 1;
  rightIndex = 1;
  sliceIndex = 0;

  @Input()
  set navNodes(navNodes: NavNode[]) {
    this._navNodes = navNodes;
    if (navNodes !== undefined) {
      this.leftIndex = navNodes.length - 1;
      this.setSliceIndex();
    }
  }
  get navNodes(): NavNode[] { return this._navNodes; }


  constructor() { }

  ngOnInit() { }

  launcherOptionClick(menu: NavNode, parent: NavNode) {
    const selectedOption: NavNode[] = [parent, menu];
    this.launcherOptionClicked.emit(selectedOption);
  }

  launcherRightClick() {
    this.selectedTabIndex = this.rightIndex;
    this.setSliceIndex();
    if (this.rightIndex + 1 === this.navNodes.length ) {
      this.rightIndex = 0;
    } else {
      this.rightIndex ++;
    }

    if ( this.leftIndex + 1 === this.navNodes.length) {
      this.leftIndex = 0;
    } else {
      this.leftIndex ++;
    }
  }

  launcherleftClick() {
    this.selectedTabIndex = this.leftIndex;
    this.setSliceIndex();
    if (this.leftIndex === 0 ) {
      this.leftIndex = this.navNodes.length - 1;
    } else {
      this.leftIndex --;
    }
    if (this.rightIndex === 0 ) {
      this.rightIndex = this.navNodes.length - 1;
    } else {
      this.rightIndex --;
    }
  }

  selectedIndexChanged(event: any) {
    this.selectedTabIndex = event;
    this.setSliceIndex();
    if (this.selectedTabIndex === 0) {
      this.rightIndex = 1;
      this.leftIndex = this.navNodes.length - 1;
    } else if (this.selectedTabIndex === this.navNodes.length - 1) {
      this.rightIndex = 0;
      this.leftIndex = this.selectedTabIndex - 1;
    } else {
      this.rightIndex = this.selectedTabIndex + 1;
      this.leftIndex = this.selectedTabIndex - 1;
    }
  }

  private setSliceIndex() {
    this.sliceIndex = (this.navNodes[this.selectedTabIndex].Children.length + 3) / 4;
  }
}
