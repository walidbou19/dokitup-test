import { Component, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from '../core/config.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  settings: any;
  onSettingsChanged: Subscription;

  private _media$: ReplaySubject<MediaChange> = new ReplaySubject(1);
  private _mediaSubscription: Subscription;

  sidenavOpen: boolean = true;
  sidenavMode: string = 'side';

  title = '后台管理系统 - Power by stbui';

  get media$(): Observable<MediaChange> {
    return this._media$.asObservable();
  }

  constructor(media: ObservableMedia, private config: ConfigService) {
    media.asObservable()
         .subscribe(res => this._media$.next(res), err => this._media$.error(err), () => this._media$.complete());

    this.onSettingsChanged = this.config.onSettingsChanged.subscribe(settings => {
      this.settings = settings;
    });
  }

  ngOnInit() {
    this._mediaSubscription = this.media$.subscribe((change: MediaChange) => {
      let isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');

      this.sidenavMode = (isMobile) ? 'over' : 'side';
      this.sidenavOpen = !isMobile;
    });

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 2000);
  }

  /**
   * @param event {Event} 事件
   * @param scrollContainer {Object} 容器dom
   */
  onActivate(event, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
