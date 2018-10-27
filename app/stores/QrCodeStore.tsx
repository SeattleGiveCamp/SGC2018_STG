import { observable, action } from 'mobx';
import * as Promise from 'bluebird';

class QrCodeStore {

	@observable
	codes: string[] = [];

	private getCodes() {
		return;
	}
}

export default QrCodeStore;