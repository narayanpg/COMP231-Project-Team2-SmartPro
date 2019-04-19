import { Component, OnInit, NgZone } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width : ${MAX_WIDTH_BREAKPOINT}px)`,
  );

  routelinks = this.getLinks();

  constructor(zone: NgZone, private jwtService: JwtService) {
    // tslint:disable-next-line: deprecation
    this.mediaMatcher.addListener(mql => {
      zone.run(() =>
        zone.run(
          () =>
            (this.mediaMatcher = matchMedia(
              `(max-width: ${MAX_WIDTH_BREAKPOINT}px)`
            ))
        )
      );
    });
  }

  ngOnInit() { }

  isScreenSmall() {
    return this.mediaMatcher.matches;
  }
  isAdmin() {
    if (this.jwtService.isAdmin()) {
      return true;
    } else {
      return false;
    }
  }
// tslint:disable-next-line: adjacent-overload-signatures
  getLinks() {
    if (this.isAdmin()) {
      const links = [
        {
          name: 'My Account',
          url: 'account'
        },
        {
          name: 'Requests',
          url: 'requests'
        },
        {
          name: 'Residents',
          url: 'residents'
        },
        {
          name: 'Staffs',
          url: 'staffs'
        },
      ];
      return links;
    } else {
      const links = [
        {
          name: 'My Account',
          url: 'account'
        },
        {
          name: 'Requests',
          url: 'requests'
        },
      ];
      return links;
    }
  }

}
