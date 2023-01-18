import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { UserRank } from "../models/UserRank";
import { ActivatedRoute } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { GameService } from "../services/game.service";

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rankPosition', 'username', 'wins', 'loses', 'draws'];
  dataSource: MatTableDataSource<UserRank>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
  ) {
    this.dataSource = new MatTableDataSource<UserRank>(this.activatedRoute.snapshot.data['userRanks']);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  reloadData() {
    this.gameService.getUsersRanks().subscribe(response => {
      this.dataSource.data = response;
    })
  }

}
