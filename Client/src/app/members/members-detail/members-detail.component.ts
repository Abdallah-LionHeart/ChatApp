import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/appModel/member';
import { Message } from 'src/app/appModel/message';
import { MembersService } from 'src/app/appServices/members.service';
import { MessageService } from 'src/app/appServices/message.service';
import { PresenceService } from 'src/app/appServices/presence.service';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {
  @ViewChild('memberTabs' , {static: true}) memberTabs!: TabsetComponent;
  member!: Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab!: TabDirective;
  messages!: Message[];

  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService , public presenceService : PresenceService) { }

  ngOnInit(): void {
    // this.loadMember(); //!there are no needs for using this , beacuse we are going to get the member from the root instead 
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      }
    ]

    this.galleryImages = this.getImges();

  }

  // loadMember() {
  //   const username = this.route.snapshot.paramMap.get('username')
  //   if (!username) return;
  //   this.memberService.getMember(username).subscribe({
  //     next: member => {
  //       this.member = member;
  //       this.galleryImages = this.getImges();
  //     }
  //   })
  // }

  getImges() {
    if (!this.member) return [];
    const imageUrls: any = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
      return imageUrls;
    }
  }

  loadMessages() {
    if (this.member)
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages') {
      this.loadMessages();
    }
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading == heading)!.active = true
    }
  }
}
