import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SongsService } from '../../service/songs.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../shared/model/response.model';
import { Song } from '../../shared/model/song.model';
import { Singlish } from '@_000407/singlish.js';

@Component({
  selector: 'app-view-song',
  templateUrl: './view-song.component.html',
  styleUrls: ['./view-song.component.scss']
})
export class ViewSongComponent implements OnInit, AfterViewChecked {
  song: Song = null;
  singlish: Singlish;
  error: ApiResponse<null> = null;
  private toReposition: Map<string, string[]> = new Map<string, string[]>();

  constructor(private songsService: SongsService,
              private route: ActivatedRoute) {
    this.singlish = new Singlish();
  }

  ngOnInit(): void {
    this.getSong();
  }

  ngAfterViewChecked(): void {
    for(const [sec , v] of this.toReposition.entries()) {
      for(const i in v) {
        this.positionChords(sec, i);
      }
    }
  }

  getSong(): void {
    this.route.params.subscribe(params => {
      if(!params.id) {
        console.error('Required parameter ID missing.');
        return;
      }

      this.songsService.getSongById(params.id).subscribe(res => {
        this.song = res.payload;
        console.log(this.song);
        const s = this.singlish;

        let content = '';
        for(const sec in this.song.chords) {
          content += `<h3 class="song-section">${sec.charAt(0).toUpperCase() + sec.slice(1)}</h3>`;
          content += `<div class='song-sec-content'>`;

          const section = this.song.chords[sec];
          const isChorusOrVerse = sec.startsWith('chorus') || sec.startsWith('verse');

          for(const i in section) {
            const line = section[i]
              .replace(/\{[a-zA-Z\s\\/\.]+\}/g, function(m) {
                return s.parse(m);
              })
              .replace(/ /g, '&nbsp;')
              .replace(/\[/g, `<span class="chord ${isChorusOrVerse ? 'chord-chorus-verse' : ''}">`)
              .replace(/\{/g, '<span class="lyric">')
              .replace(/[\}\]]/g, '</span>');

            content += `<p class="song-line ${isChorusOrVerse ? 'song-line-chorus-verse' : 'song-line-intro-inter'} song-${sec}-line-${i}">${line}</p>`;

            if(isChorusOrVerse) {
              if(this.toReposition.has(sec)) {
                this.toReposition.get(sec).push(i);
              }
              else {
                this.toReposition.set(sec, [i]);
              }
            }
          }
          content += '</div>';
        }

        document.getElementById('song').innerHTML = content;
      },
      res => {
        this.error = res.error;
      });
    });
  }

  positionChords(sec, i) {
    let lyric_acc_offset = 0;
    let chord_acc_offset = 0;

    for(const [k, elem] of document.querySelectorAll(`p.song-${sec}-line-${i} span.chord`).entries()) {
      lyric_acc_offset += elem.offsetWidth;

      if(k > 0) {
        chord_acc_offset += elem.offsetWidth;
        elem.style.transform = `translateX(-${chord_acc_offset}px)`;
      }
      else {
        if(elem.innerHTML.length > 2) {
          chord_acc_offset += Math.round(elem.offsetWidth * 0.8);
        }
      }

      if(elem.nextSibling) {
        elem.nextSibling.style.transform = `translateX(-${lyric_acc_offset}px)`;
      }
    }
  }
}
