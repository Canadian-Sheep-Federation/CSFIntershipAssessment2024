import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PlayerinfoComponent } from './playerinfo/playerinfo.component';
import { PostplayerComponent } from './postplayer/postplayer.component';

export const routes: Routes = [{
    path: '',
    component: AppComponent,
    children: [
        {
            path: '',
            component: LandingpageComponent
        },
        {
            path: 'playerinfo',
            component: PlayerinfoComponent
        },
        {
            path: 'addplayer',
            component: PostplayerComponent
        },
        {
            path: 'publicAPI',
            component: PlayerinfoComponent
        }
    ]
}];

