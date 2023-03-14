import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/appModel/message';
import { MessageService } from 'src/app/appServices/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string;
  @Input() messages!: Message[];
  message!: Message[];
  messageContent = '';
  loading = false;


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }


  // sendMessage() { }
  //   if (!this.username) return;
  //   this.loading = true;
  //   this.messageService.sendMessage(this.username, this.messageContent).then(() => {
  //     this.messageForm?.reset();
  //   }).finally(() => this.loading = false);
  // }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.message.push(message);
        this.messageForm?.reset();
      }
    })
  }

}
