import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../../models/Client";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.scss"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    // Get Id from URL
    this.id = this.route.snapshot.params["id"];
    // Get the client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onDeleteClick() {
    if (confirm("Are you sure?")) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show("Client removed", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/"]);
    }
  }
}
