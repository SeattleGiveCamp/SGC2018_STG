import { observable, action } from 'mobx';
import axios from 'axios';

class DataStore {

	private serverUrl = 'https://edf76ec0.ngrok.io';

	@observable
	missions: any[] = [];

	@observable
	currentMission: any;

	public loadMissions() {
		this.setMissions([]);

		return axios.get(`${this.serverUrl}/getTasks`)
			.then(response => {
				this.setMissions(response.data.tasks);
			})
			.catch(err => {
				console.log(err);
			});
	}

	public loadMissionById(id: string) {
		this.setCurrentMission(null);

		return axios.get(`${this.serverUrl}/getContent/${id}`)
			.then(response => {
				this.setCurrentMission(response.data);
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