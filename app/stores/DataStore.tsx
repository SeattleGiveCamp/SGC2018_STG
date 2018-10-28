import { observable, action } from 'mobx';
import axios from 'axios';
import * as Promise from 'Bluebird';

class DataStore {

	private serverUrl = 'https://edf76ec0.ngrok.io';

	@observable
	missions: any[] = [];

	@observable
	currentMission: any;

	public loadMissions() {
		this.setMissions([]);

		return axios.get(`${this.serverUrl}/getMissions`)
			.then(response => {
				this.setMissions(response.data.missions);
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

	@action
	private setCurrentMission(mission) {
		this.currentMission = mission;
	}

	@action
	private setMissions(missions) {
		this.missions = missions;
	}
}

export default DataStore;