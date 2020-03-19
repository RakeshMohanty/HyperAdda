import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { LoaderService } from './../../../core';
import { NavNodeService } from './../../services/nav-node.service';
import { NavNode } from './../../models/nav-node.model';
import { filter } from 'rxjs/operators';
import { ToolBarComponent } from './../tool-bar/tool-bar.component';

// if reduce or increase below constants do for both the constants
const SIDE_NAV_WIDTH = 250;
const STICKY_MENU_WIDTH = 55;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy  {
  private formChangesubscription: Subscription;
  private formClosesubscription: Subscription;
  isFormLoaded = false;
  formWidth = 0;
  menuWidth = STICKY_MENU_WIDTH;
  formMode = 'over';
  menuMode = 'side';
  leftMargin = 0;
  isFormOnHold = false;
  isClickedByClose = false;
  displayTiles = true;
  dispalyToggleButton = false;
  @ViewChild('sidenav1') sidenav: MatSidenav;
  @ViewChild('sidenav2') sidenav2: MatSidenav;
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @ViewChild(ToolBarComponent) private toolBarComponent: ToolBarComponent;

  isDarkTheme = false;
  dir = 'ltr';
  direction = 'row';
  displayStickyMenu = true;
  isPinned = false;
  isDirty = false;
  selectedMenuId: number;
  selectedPMenuId: number;
  navNodes: NavNode[];
  constructor(
    private loader: LoaderService,
    private router: Router,
    private navservice: NavNodeService
  ) {}

  ngOnInit() {
    this.formChangesubscription = this.loader
      .onComponentAdd()
      .subscribe(width => this.displayDrawer(width));
    this.formClosesubscription = this.loader
      .onFormClose()
      .subscribe(x => this.closeForm());
    this.loader.setRootViewContainerRef(this.viewContainerRef);
    this.getNavNodes();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(data => this.navigationCompleted());
  }

  private navigationCompleted() {
    if (this.router.url === '/') {
      this.sidenav.close();
      this.displayTiles = true;
      this.leftMargin = 0;
    } else {
      if (!this.isPinned) {
        this.displaySideStickyMenu();
      }
    }
  }

  private getNavNodes() {
    // this.navservice.getNavNodes().subscribe(data => {
    //   this.navNodes = data;
    // });

    this.fetch((data) => {
      this.navNodes = data;
    }, 'nav-nodes');
  }

  onMenuMouseover() {
    this.menuWidth = SIDE_NAV_WIDTH;
    this.displayStickyMenu = false;
  }

  onMenuMouseleave() {
    if (!this.isPinned) {
      this.menuWidth = STICKY_MENU_WIDTH;
      this.displayStickyMenu = true;
    }
  }

  toggleStickyMenu() {
    if (!this.isPinned) {
      this.isPinned = true;
      this.menuWidth = SIDE_NAV_WIDTH;
      this.leftMargin = 195;
      this.toolBarComponent.hideLogo(false);
    } else {
      this.toolBarComponent.hideLogo(true);
      this.isPinned = false;
      this.menuWidth = STICKY_MENU_WIDTH;
      this.leftMargin = 0;
      if (this.isDirty) {
        this.sidenav.close().then(() => {
          this.sidenav.open();
        });
        this.isDirty = false;
      }
    }
  }

  onLogoClick() {
    this.router.navigate(['/']);
    // this.dispalyToggleButton = true;
  }

  onLauncherClicked(menus: NavNode[]) {
    const menuItem = menus[1];
    const menuParent = menus[0];
    this.displaySideStickyMenu();
    this.selectedMenuId = menuItem.Id;
    this.selectedPMenuId = menuParent.Id;
    this.navNodes.forEach(x => (x.Expand = false));
    menuParent.Expand = true;
    const routePath = `/${menuItem.Route}`;
    this.router.navigate([routePath]);
  }

  displaySideStickyMenu() {
    this.displayTiles = false;
    this.menuWidth = STICKY_MENU_WIDTH;
    this.leftMargin = 0;
    this.isPinned = false;
    this.displayStickyMenu = true;
    this.sidenav.open();
  }

  onSubmenuClick(menuItem: NavNode, pmenu: NavNode) {
    const routePath = `/${menuItem.Route}`;
    this.selectedMenuId = menuItem.Id;
    this.selectedPMenuId = pmenu.Id;
    this.navNodes.forEach(x => (x.Expand = false));
    pmenu.Expand = true;
    this.router.navigate([routePath]);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  onBackdropClick() {
    this.isFormOnHold = true;
  }

  onEscape(res: string) {
    this.isFormOnHold = true;
  }

  closeForm() {
    this.sidenav2.close();
    this.isClickedByClose = true;
  }

  holdForm() {
    this.isFormLoaded = false;
    if (this.isClickedByClose) {
      this.isFormOnHold = false;
      this.isClickedByClose = false;
    } else {
      this.isFormOnHold = true;
    }
  }

  onHoldForm() {
    this.sidenav2.open();
    this.isFormLoaded = true;
    this.isFormOnHold = false;
  }

  displayDrawer(width: number) {
    this.formWidth = width;
    this.sidenav2.open();
    if (this.isPinned) {
      this.isDirty = true;
      this.leftMargin = 0;
    }
  }

  fetch(mockData, file) {
    const req = new XMLHttpRequest();
    const path = `assets/data/${ file }.json`;
    req.open('GET', path);
    req.onload = () => {
      mockData(JSON.parse(req.response));
    };
    req.send();
  }

  ngOnDestroy(): any {
    this.formChangesubscription.unsubscribe();
    this.formClosesubscription.unsubscribe();
}
}
