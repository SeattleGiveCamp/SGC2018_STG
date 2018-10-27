import * as React from 'react';
import * as QrReader from 'react-qr-reader';

interface Props {
	type: string;
	width: number;
	height: number;
	completed: any;
}

class Scanner extends React.Component<Props, {}> {

	get rectangle() {
		const padding = 10;

		return this.props.type === 'qr' ?
			{ x: padding * 2, y: padding * 2, width: this.props.width - (padding * 4), height: this.props.height - (padding * 4) } :
			{ x: padding, y: this.props.height / 5, width: this.props.width - (padding * 2), height: (this.props.height / 5) * 3 };
	}

	handleError(error) {
		console.log('qr code error ', error);
	}

	handleScan(data) {
		this.props.completed(data);
	}

	render() {
		return (
			<div style={{ width: `${this.props.width}px`, height: `${this.props.height}px`, position: 'relative' }}>
				<canvas
					ref={(element) => {
						if (!element) {
							return;
						}
						const ctx = element.getContext('2d');
						if (ctx) {
							ctx.beginPath();
							ctx.lineWidth = 8;
							ctx.strokeStyle = 'red';
							ctx.rect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
							ctx.stroke();
						}
					}}
					style={{ position: 'absolute', zIndex: 99, opacity: 0.5 }}
					width={this.props.width}
					height={this.props.height}
				/>
				<QrReader
					showViewFinder={false}
					onError={this.handleError.bind(this)}
					onScan={this.handleScan.bind(this)}
					style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}
				/>
			</div>
		);
	}
}

export default Scanner;