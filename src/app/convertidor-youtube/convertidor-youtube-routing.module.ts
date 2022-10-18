import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvertidorYoutubePage } from './convertidor-youtube.page';

const routes: Routes = [
  {
    path: '',
    component: ConvertidorYoutubePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvertidorYoutubePageRoutingModule {}
