import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../shared/model/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
    users: User[];
    constructor(private userService: UserService) {}

    displayedColumns = ['diaplayName', 'points'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    ngOnInit() {
        
        this.userService.getLeaderboard()
            .subscribe(
                data => {
                    this.users = data.map(e => {
                        return {
                        id: e.payload.doc.id,
                        ...e.payload.doc.data()
                        } as User;
                    });
                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.users);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                });
    }
}
