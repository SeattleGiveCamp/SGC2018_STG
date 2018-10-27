import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link, RouterStore } from 'mobx-router';

import routes from '../routes';

interface Props {
	store?: RouterStore;
}

@inject('store')
@observer
class ContentPageContainer extends React.Component<Props, {}> {

	render() {

		return (
			<div style={{ textAlign: 'center' }}>
				<h1>Content Page</h1>
				<img
					src="https://i.ebayimg.com/images/g/C1EAAOSwiCRUbSWP/s-l300.jpg"
				/>
				<p>Go to the Jimi Hendrix Statue. It looks like this. When you get there, find and scan the STG QR code.</p>
				<p>
					<Link
						view={routes.qrreader}
						store={this.props.store}
					>
						Scan QR Code
					</Link>
				</p>
			</div>
		);
	}
}

export default ContentPageContainer;