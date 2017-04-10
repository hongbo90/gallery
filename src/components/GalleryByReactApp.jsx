import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//css
import '../styles/main.scss';

//imageData Json数据
var imageData = require('../data/imageData.json');

//生成imageURL路径函数
imageData = (function genImageURL(imageData){
	for(var i=0;i<imageData.length;i++){
		var singleImageData = imageData[i];
		singleImageData.imageURL = require('../images/'+ singleImageData.fileName);
		imageData[i] = singleImageData;
	}
	return imageData;
})(imageData);

//获取区间内的一个随机值
function getRangeRandom(low,high){
	return Math.ceil(Math.random() * (high - low) + low);
}

//获取30度以内的正负值
function get30DegRandom(){
	if(Math.random() > 0.5 ){
		return Math.ceil(Math.random()*30);
	}
	return -(Math.ceil(Math.random()*30));
}

class ImgFigure extends Component{

	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}

	render(){
		var styleObj = {};
		//如果props属性中指定这张图片的位置，则使用
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}

		//如果旋转角度有且不为0，添加旋转角度
		if(this.props.arrange.rotate){
			(['MozTransform','msTransform','WebkitTransform','']).forEach((value)=>{
				styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			});
			
		}

		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11;
		}

		var imgFigureClassName = "img-figure";
			if(this.props.arrange.isInverse){
				imgFigureClassName+= " is-inverse";
			}

		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img className="imgPic" src={this.props.data.imageURL} alt={this.props.data.title} />
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
		);
	}
}


//控制组件
class ControllerUnits extends Component{

	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		//
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.preventDefault();
		e.stopPropagation();
	}

	render(){
		var controllerUnitClassName = "controller-unit";
		if(this.props.arrange.isCenter){
			controllerUnitClassName += " is-center";
			if(this.props.arrange.isInverse){
				controllerUnitClassName += " is-inverse";
			}
		}
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick}>
			</span>
		);
	}
}

class GalleryByReactApp extends Component{

	constructor(){
		super();
		this.constant = {
			centerPos:{
				left:0,
				right:0
			},
			hPosRange:{
				leftSecX:[0,0],
				rightSecX:[0,0],
				y:[0,0]
			},
			vPosRange:{
				x:[0,0],
				topY:[0,0]
			}
		};

		this.state = {
			imgsArrangeArr:[
				// {
				// 	pos:{
				// 		left:'0',
				// 		top:'0'
				// 	},
				//  rotate:0,
				//  isInverse:false,
				//	isCenter:false
				// }
			]
		}
	}

	inverse(index){
		return ()=>{
			var imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
			this.setState({
				imgsArrangeArr:imgsArrangeArr
			});
		}
	}

	//重新布局所有图片
	reArrange(centerIndex){
		var imgsArrangeArr = this.state.imgsArrangeArr,
			constant = this.constant,
			centerPos = constant.centerPos,
			hPosRange = constant.hPosRange,
			vPosRange = constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopSecY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],
			//取一个或者不取
			topImgNum = Math.floor(Math.random()*2),
			topImgSpliceIndex = 0,
			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

			//首先居中centerIndex的图片
			imgsArrangeCenterArr[0] = {
				pos:centerPos,
				rotate:0,
				isCenter:true
			};

			//取出要布局上侧的图片的状态信息
			topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));

			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

			//布局位于上侧的图片
			imgsArrangeTopArr.forEach((value,index)=>{
				imgsArrangeTopArr[index] = {
					pos:{
						top:getRangeRandom(vPosRangeTopSecY[0],vPosRangeTopSecY[1]),
						left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
					},
					rotate:get30DegRandom(),
					isCenter:false
				}
			});

			//布局左右两侧的图片
			for(var i = 0, j=imgsArrangeArr.length,k=j/2;i<j;i++){
				var hPosRangeLoRX = null;
				//前半部分布局左边，右半部分布局右边
				if(i<k){
					hPosRangeLoRX = hPosRangeLeftSecX;
				}else{
					hPosRangeLoRX = hPosRangeRightSecX;
				}
				imgsArrangeArr[i] = {
					pos:{
						top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
						left:getRangeRandom(hPosRangeLoRX[0],hPosRangeLoRX[1])
					},
					rotate:get30DegRandom(),
					isCenter:false
				}
			}

			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
			}

			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

			this.setState({
				 imgsArrangeArr:imgsArrangeArr
			});

	}

	//居中对应index的图片

	center(index){
		return ()=>{
			this.reArrange(index);
		}
	}

	//组件加载后，为每张图计算位置的范围
	componentDidMount(){
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageWidth = stageDOM.scrollWidth,
			stageHeight = stageDOM.scrollHeight,
			halfStageWidth = Math.ceil(stageWidth/2),
			halfStageHeight = Math.ceil(stageHeight/2);

		//得到一个imgFigure大小
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgWidth = imgFigureDOM.scrollWidth,
			imgHeight = imgFigureDOM.scrollHeight,
			halfImgWidth = Math.ceil(imgWidth/2),
			halfImgHeight = Math.ceil(imgHeight/2);

		//中心图片的位置
		this.constant.centerPos = {
			left:halfStageWidth - halfImgWidth,
			top:halfStageHeight - halfImgHeight
		}

		//左.右侧位置
		this.constant.hPosRange.leftSecX[0] = -halfImgWidth;
		this.constant.hPosRange.leftSecX[1] = halfStageWidth - 3*halfImgWidth;
		this.constant.hPosRange.rightSecX[0] = halfStageWidth + halfImgWidth;
		this.constant.hPosRange.rightSecX[1] = stageWidth - halfImgWidth;
		this.constant.hPosRange.y[0] = -halfImgHeight;
		this.constant.hPosRange.y[1] = stageHeight - halfImgHeight;

		this.constant.vPosRange.topY[0] = -halfImgHeight;
		this.constant.vPosRange.topY[1] = halfStageHeight - halfImgHeight * 3;
		this.constant.vPosRange.x[0] = halfStageWidth - imgWidth;
		this.constant.vPosRange.x[1] = halfStageWidth;


		this.reArrange(0);
	}

	render(){
		var controllerUnits = [],
			imgFigures = [];
		console.log(this.constant);
		imageData.forEach((value,index)=>{

			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos:{
						left:'0',
						top:'0'
					},
					rotate:0,
					isInverse:false,
					isCenter:false
				}
			}

			imgFigures.push(<ImgFigure key={index} data={value} ref={"imgFigure"+index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);

			controllerUnits.push(<ControllerUnits key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
		})

		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		)
	}
}

export default GalleryByReactApp;