import { Injectable } from '@angular/core';
import { SidenavItem } from './item/item.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidenavService {

  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _items: SidenavItem[] = [];
  items$: Observable<SidenavItem[]> = this._itemsSubject.asObservable();

  private _currentlyOpenSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[] = [];
  currentlyOpen$: Observable<SidenavItem[]> = this._currentlyOpenSubject.asObservable();

  constructor() {
    const dashboard = this.addItem('home', 'home', '/home', 1);
    const materials = this.addItem('bubble_chart', 'bubble_chart', null, 3);
    this.addSubItem(materials, 'pagination', '/materials/pagination', 3);
    this.addSubItem(materials, 'datepicker', '/materials/datepicker', 3);
    this.addSubItem(materials, 'popover', '/materials/popover', 3);
    this.addSubItem(materials, 'buttons', '/materials/buttons', 1);
    this.addSubItem(materials, 'cards', '/materials/cards', 2);
    this.addSubItem(materials, 'lists', '/materials/lists', 3);
    this.addSubItem(materials, 'menu', '/materials/menu', 3);
    this.addSubItem(materials, 'slider', '/materials/slider', 3);
    this.addSubItem(materials, 'tabs', '/materials/tabs', 3);
    this.addSubItem(materials, 'tooltips', '/materials/tooltips', 3);
    this.addSubItem(materials, 'dialogs', '/materials/dialogs', 3);
    this.addSubItem(materials, 'Toast', '/materials/toast', 3);
    this.addSubItem(materials, 'Snack-Bar', '/materials/snackbar', 3);
    this.addSubItem(materials, 'icon', '/materials/icon', 3);

    const components = this.addItem('equalizer', 'equalizer', null, 3, '1', '#4CAF50');
    this.addSubItem(components, 'amap', '/materials/amap', 1);
    this.addSubItem(components, 'Markdown', '/materials/markdown', 1);
    this.addSubItem(components, 'chart', '/components/chart', 1);
    this.addSubItem(components, 'popover', '/materials/popover', 1);
    this.addSubItem(components, 'calendar', '/materials/calendar', 1);
    this.addSubItem(components, 'popover', '/materials/popover', 1);

    const forms = this.addItem('format_color_text', 'format_color_text', null, 4);
    this.addSubItem(forms, 'elements', '/forms/elements', 1);
    this.addSubItem(forms, 'validation', '/forms/validation', 1);
    this.addSubItem(forms, 'editor', '/forms/editor', 1);

    const tables = this.addItem('list', 'list', null, 5);
    this.addSubItem(tables, 'static', '/tables/static', 1);
    this.addSubItem(tables, 'datatable', '/tables/datatable', 2);
    this.addSubItem(tables, 'dynamic', '/tables/dynamic', 3);

    const pages = this.addItem('content_copy', 'content_copy', null, 7);
    // this.addSubItem(pages, '关于', '/pages/about', 1);
    // this.addSubItem(pages, '服务', '/pages/services', 1);
    // this.addSubItem(pages, '联系', '/pages/contact', 1);
    // this.addSubItem(pages, '团队', '/pages/terms', 1);
    this.addSubItem(pages, 'file-manager', '/pages/file-manager', 1);
    this.addSubItem(pages, '团队管理', '/', 1);
    this.addSubItem(pages, 'projects', '/pages/projects', 1);
    this.addSubItem(pages, '联系人', '/', 1);
    this.addSubItem(pages, 'profile', '/pages/profile', 1);
    this.addSubItem(pages, 'blog', '/pages/blog', 1);
    // this.addSubItem(pages, '收藏神器', '/pages/collection', 1);
    this.addSubItem(pages, 'user', '/pages/user', 1);

    const extraPages = this.addItem('more_horiz', 'more_horiz', null, 8);
    this.addSubItem(extraPages, 'sigin', '/sigin', 1);
    this.addSubItem(extraPages, 'sigup', '/sigup', 1);
    this.addSubItem(extraPages, '404', '/sigup', 1);
    this.addSubItem(extraPages, '500', '/sigup', 1);

    const apps = this.addItem('apps', 'apps', null, 8);
    this.addSubItem(apps, 'ALL', '/apps/todo/ALL', 1);
    this.addSubItem(apps, 'chats', '/apps/chats', 1);
    this.addSubItem(apps, 'mail', '/apps/mail', 1);
    this.addSubItem(apps, 'navigation', '/apps/navigation', 1);

    // const analysis = this.addItem('poll', 'poll', null, 8);
    // this.addSubItem(analysis, 'crowd', '/analysis/crowd', 1);
    // this.addSubItem(analysis, 'preference', '/analysis/preference', 1);
    // this.addSubItem(analysis, 'population', '/analysis/population', 1);
    // this.addSubItem(analysis, 'equipment', '/analysis/equipment', 1);
    // this.addSubItem(analysis, 'scePortrait', '/analysis/scePortrait', 1);

    // const crm = this.addItem('business', 'business', null, 8);
    // this.addSubItem(crm, 'lead', '/crm/lead', 1);
    // this.addSubItem(crm, 'lead', '/crm/lead', 1);
    // this.addSubItem(crm, '公海', '/crm/lead', 1);
    // this.addSubItem(crm, '联系人', '/crm/lead', 1);
    // this.addSubItem(crm, '商机', '/crm/lead', 1);
    // this.addSubItem(crm, '产品', '/crm/lead', 1);

    const apm = this.addItem('code', 'code', null, 9, 'new', '#3F51B5');
    this.addSubItem(apm, 'error', '/apm/error', 1);
    this.addSubItem(apm, 'performance', '/apm/performance', 1);

  }

  addItem(name: string, icon: string, route: any, position: number, badge?: string, badgeColor?: string, customClass?: string) {
    const item = new SidenavItem({
      name: name,
      icon: icon,
      route: route,
      subItems: [],
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null,
      customClass: customClass || null
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(parent: SidenavItem, name: string, route: any, position: number) {
    const item = new SidenavItem({
      name: name,
      route: route,
      parent: parent,
      subItems: [],
      position: position || 99
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  removeItem(item: SidenavItem) {
    const index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
    }

    this._itemsSubject.next(this._items);
  }

  isOpen(item: SidenavItem) {
    return (this._currentlyOpen.indexOf(item) !== -1);
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;
    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = []) {
    currentlyOpen.unshift(item);

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    const currentlyOpen = [];

    const item = this.findByRouteRecursive(route, this._items);

    // if (item && item.hasParent()) {
    //   currentlyOpen = this.getAllParents(item);
    // } else if (item) {
    //   currentlyOpen = [item];
    // }
    //
    // this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: string, collection: SidenavItem[]) {
    let result = collection.filter((item) => {
      if (item.route === route) {
        return item;
      }
    });


    if (!result) {
      collection.forEach((item) => {
        if (item.hasSubItems()) {
          const found = this.findByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    }

    return result;
  }

  get currentlyOpen() {
    return this._currentlyOpen;
  }

  getSidenavItemByRoute(route) {
    return this.findByRouteRecursive(route, this._items);
  }

}
