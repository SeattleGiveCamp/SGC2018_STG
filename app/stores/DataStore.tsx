import { observable, action } from 'mobx';
import axios from 'axios';
import * as Promise from 'Bluebird';

class DataStore {

	private serverUrl = 'https://72824b22.ngrok.io';

	@observable
	missions: any[] = [];

	@observable
	currentMission: any;

	@observable
	points: number;

	public loadMissions() {
		this.setMissions([]);

		return axios.get(`${this.serverUrl}/getMissions`)
			.then(response => {
				const missions = response.data.missions;

				return Promise.all(missions.map(mission => {
					return axios.get(`${this.serverUrl}/getTasks/${mission.MissionID}`)
						.then(res => {
							mission.tasks = res.data.tasks;

							return mission;
						});
				}));
			})
			.then(missions => {
				this.setMissions(missions);
				console.log(missions);
			})
			.catch(err => {
				console.log(err);
			});
	}

	public loadMissionById(id: string) {
		this.setCurrentMission(null);

		return Promise.all([
			axios.get(`${this.serverUrl}/getMission/${id}`),
			axios.get(`${this.serverUrl}/getTasks/${id}`),
		])
			.then(response => {
				const mission = response[0].data;
				const tasks = response[1].data.tasks;

				mission.tasks = tasks;

				this.setCurrentMission(mission);
			})
			.catch(err => {
				console.log(err);
			});
	}

	public addPoints(userId: number, taskId: string) {
		return axios.put(`${this.serverUrl}/add/${userId}/${taskId}`)
			.then(response => {
				return response.data.descr;
			})
			.catch(err => {
				console.log(err);
			});
	}

	public getUserPoints(username: string) {
		return axios.get(`${this.serverUrl}/points/${username}`)
			.then(response => {
				this.setPoints(response.data.points);
			})
			.catch(err => {
				console.log(err);
			});
	}

	@action
	private setCurrentMission(mission) {
		this.currentMission = mission;
	}

	@action
	private setMissions(missions) {
		this.missions = missions;
	}

	@action
	private setPoints(points) {
		this.points = points;
	}
}

export default DataStore;