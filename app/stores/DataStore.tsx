import { observable, action } from 'mobx';
import axios from 'axios';
import * as Promise from 'Bluebird';

// This is the mobx data store. It stores the data that the application uses for rendering pages.
class DataStore {

	// This is the base URL of the API server.
	// TODO: This needs to be changed when the url of the API changes.
	private serverUrl = 'https://72824b22.ngrok.io';

	// These are mobx observables. This is what holds the actual data.
	@observable
	missions: any[] = [];

	@observable
	currentMission: any;

	@observable
	points: number;

	// Load the missons from the API and put that data into the missions array.
	public loadMissions() {
		this.setMissions([]);

		return axios.get(`${this.serverUrl}/getMissions`)
			.then(response => {
				const missions = response.data.missions;

				// This code actually injects the tasks into the missions data so it is easier to work with
				// in the react components.
				// TODO: This is not scalable, so either need to change how the react component uses the data
				// or make the API call do this work for you.
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

	// These are mobx actions that actually update the observable data. Any updating of observable data
	// has to be done in a mobx action.
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