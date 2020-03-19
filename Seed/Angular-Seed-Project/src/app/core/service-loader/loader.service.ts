import {
  ComponentFactoryResolver,
  ComponentFactory,
  Injectable,
  Inject,
  ReflectiveInjector,
  ViewContainerRef
} from '@angular/core';

import { Observable ,  Subject } from 'rxjs';
import { DrawerComponent } from './drawer-component';

@Injectable()
export class LoaderService {
  private factoryResolver: ComponentFactoryResolver;
  private rootViewContainer: ViewContainerRef;
  private subject = new Subject<number>();
  private subjectClose = new Subject<boolean>();

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  onComponentAdd(): Observable<number> {
    return this.subject.asObservable();
  }

  onFormClose(): Observable<boolean> {
    return this.subjectClose.asObservable();
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent(factory: ComponentFactory<DrawerComponent>, width: number, data: any) {
    // const factory = this.factoryResolver
                        // .resolveComponentFactory(dynamicComponent);
    this.rootViewContainer.clear();
    const component = factory
      .create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
    (<DrawerComponent>component.instance).sliderFormData = data;
    this.subject.next(width);
  }

  closeForm() {
    this.subjectClose.next(true);
  }

  cancelForm() {
    this.subjectClose.next(false);
  }
}
