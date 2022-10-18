import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvertidorYoutubePageRoutingModule } from './convertidor-youtube-routing.module';

import { ConvertidorYoutubePage } from './convertidor-youtube.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvertidorYoutubePageRoutingModule
  ],
  declarations: [ConvertidorYoutubePage]
})
export class ConvertidorYoutubePageModule {}
