import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: "pst-discord-callback",
  templateUrl: "./discord-callback.component.html",
  styleUrls: ["./discord-callback.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscordCallbackComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    localStorage.setItem(environment.discord.authDiscordCodeKey, this.activatedRoute.snapshot.queryParamMap.get("code"));
  }

}
