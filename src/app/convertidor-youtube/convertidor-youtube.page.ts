import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-convertidor-youtube',
  templateUrl: './convertidor-youtube.page.html',
  styleUrls: ['./convertidor-youtube.page.scss'],
})
export class ConvertidorYoutubePage implements OnInit {

constructor(private authService:AuthService,private router:Router){

}
  ngOnInit(): void {

  }


  converter(youtubelink, audio_tag) {
    fetch("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent(youtubelink)).then(response => {
      if (response.ok) {
        var audio_streams = {};

        response.text().then(data => {

          var regex = /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu;

          data = data.split('window.getPageData')[0];
          data = data.replace('ytInitialPlayerResponse = null', '');
          data = data.replace('ytInitialPlayerResponse=window.ytInitialPlayerResponse', '');
          data = data.replace('ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};', '');

          var matches = regex.exec(data);
          var data1 = matches && matches.length > 1 ? JSON.parse(matches[1]) : false;

          console.log(data1);

          var streams = [],
            result = {};

          if (data1.streamingData) {

            if (data1.streamingData.adaptiveFormats) {
              streams = streams.concat(data1.streamingData.adaptiveFormats);
            }

            if (data1.streamingData.formats) {
              streams = streams.concat(data1.streamingData.formats);
            }

          } else {
            return false;
          }

          streams.forEach(function (stream, n) {
            var itag = stream.itag * 1,
              quality: any = false;
            console.log(stream);
            switch (itag) {
              case 139:
                quality = "48kbps";
                break;
              case 140:
                quality = "128kbps";
                break;
              case 141:
                quality = "256kbps";
                break;
              case 249:
                quality = "webm_l";
                break;
              case 250:
                quality = "webm_m";
                break;
              case 251:
                quality = "webm_h";
                break;
            }
            if (quality) audio_streams[quality] = stream.url;
          });
          
          console.log("links de los audios",audio_streams);
          

          audio_tag.src = audio_streams['256kbps'] || audio_streams['128kbps'] || audio_streams['48kbps'];

          audio_tag.play();
        })
      }
    });
  }
  
  EvenListener() {
    var youtubelink = (<HTMLInputElement>document.getElementById('youtubelink')).value;

    let link = (document.getElementById("youtubelink") as HTMLInputElement).value;
    console.log("link del video", link)

    console.log("filtrado :",link.split('=')[1]);

    console.log("https://www.youtube.com/embed/"+link.split('=')[1].split('&')[0])
    let linkIframe = "https://www.youtube.com/embed/"+link.split('=')[1].split('&')[0];


    document.getElementById('audio').style.display = 'block';
    let iframe = document.getElementById('iframe-youtube');
    iframe.hidden = false;
    iframe.setAttribute("src", linkIframe)
    
    var audio_tag = document.getElementById('audio');
    this.converter(youtubelink, audio_tag);
    console.log("audio_tag", audio_tag);
    console.log('Video convertido a M4a');

    setTimeout(() => {
      let linkAudio = document.getElementById('audio').getAttribute('src');
    console.log(linkAudio)

    console.log('link del audio', (<HTMLInputElement>document.getElementById('audio')).src);
      const anchor = document.createElement('a');
      anchor.href = linkAudio; 
      anchor.setAttribute("href", linkAudio)
      anchor.download = 'la renga';
      anchor.type = "audio/m4a";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }, 5000);
    
    


  };

  
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}