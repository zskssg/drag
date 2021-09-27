import React from "react";
import axios from 'axios'
import { Row, Col, Button, Modal} from 'antd';
import { CloseCircleOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'
import '../assets/css/pageMain/index.css'

const { confirm } = Modal;

class PageMain extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      studyLists:[],
      studyLists2:[],
      studyLists3:[],
      componentTitle:[
        {
          value:'Prepare to study',
          color:'#efdbff'
        },
        {
          value:'Learning',
          color:'#efdbff'
        },
        {
          value:'Complete',
          color:'#efdbff'
        }
      ]
    }

  }
  componentDidMount(){
    axios.get('/json/data.json')
    .then((res)=>{
      console.log(res);
      this.setState({
        studyLists:res.data.studyLists,
        studyLists1:res.data.studyLists2,
        studyLists2:res.data.studyLists3,
      })
    })
  }
  render(){
    return (
      <div>
        <Row className='module' style={{border:'1px solid #000'}} >
          {/* 各板块标题 */}
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6 ,offset:1}} className='plate-title' style={{backgroundColor:'#efdbff'}}>
            Prepare to study
          </Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6,offset:2}} className='plate-title' style={{backgroundColor:'#d9f7be'}}>
            Learning
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6,offset:2}} className='plate-title' style={{backgroundColor:'#f0f0f0'}}>
            Complete
          </Col>
          
          {/* 各板块内容 */}
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6 ,offset:1}} algin='top'  className='plate' style={{backgroundColor:'#efdbff'}}>
            {/* 准备学习板块任务列表 */}
            <ul>
              {
                this.state.studyLists.map((item,index)=>{
                  return(
                    <li key={index}
                      draggable='true'
                      onDoubleClick={(e)=>{this.doubleClick(e)}}
                      onDragStart = {(e)=>{this.dragStart(e,index)}}
                      onDragEnd = {(e)=>{this.dragEnd(e,this.state.studyLists,index)}}
                     >
                      <span>{item.title}</span>
                      <input type='text' value={item.title}
                       onChange={(e)=>{this.updateContext(e,index)}}
                       onKeyDown={(e)=>{this.keyDown(e,index)}}
                     />
                    </li>
                  )
                })
              }
            </ul>
            {/* 添加任务按钮 */}
            <Button shape="round" ghost style={{color:'#9254de'}} onClick={(e)=>{this.addItem(e)}}>添加</Button>
          </Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6,offset:2}}
            className='plate plate-learning'
            style={{backgroundColor:'#d9f7be'}}
            onDragEnter={(e)=>{this.targetDragEnter(e)}}
            >
          {/* 正在学习模块列表 */}
          <ul>
            {
              this.state.studyLists2.map((item,index)=>{
                return(
                  <li key={index}
                    className='learning-item'
                    >
                    <span>{item.title}</span>
                    <CloseCircleOutlined className='learning-item-icon' 
                    onClick={(e)=>{this.showDeleteConfirm(e,this.state.studyLists2,index)}}
                     />
                  </li>
                )
              })
            }
          </ul>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6,offset:2}}
           className='plate plate-complete'
            style={{backgroundColor:'#f0f0f0'}}
            onDragEnter={(e)=>{this.targetDragEnter(e)}}
          >
            <ul>
              {
                this.state.studyLists3.map((item,index)=>{
                  return(
                    <li key={index}
                      className='complete-item'
                      draggable='true'
                      onDragEnd = {(e)=>{this.dragEnd(e,this.state.studyLists3,index)}}
                      >
                      <span>{item.title}</span>
                      <div className='complete-item-line'></div>
                    </li>
                  )
                })
              }
            </ul>
          </Col>
        </Row>
      </div>
    )
  }

  /* 删除模态框 */
  showDeleteConfirm(e,targetLists,index) {
    let that = this;
    confirm({
      title: '你确定要删除此任务吗?',
      icon: <ExclamationCircleOutlined />,
      content: targetLists[index].title,
      okText: '确定',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        that.deleteItem(e,targetLists,index)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /* 删除item事件 */
  deleteItem(e,targetLists,index){
    let lists = [...targetLists];
    lists.splice(index,1);
    if(targetLists[index].type === 'studyLists')
      this.setState({
        studyLists:lists
      })
    else if(targetLists[index].type === 'studyLists2')
      this.setState({
        studyLists2:lists
      })
    else if(targetLists[index].type === 'studyLists3')
      this.setState({
        studyLists3:lists
      })
  }
  /* 双击修改内容 */
  doubleClick(e){
    e.preventDefault();
    if(e.target.localName ==='span'){
      let elInput = e.target.parentElement.children[1];
      elInput.style.display = 'block'
      e.target.style.display='none'
    }
    if(e.target.localName ==='li'){
      let elText = e.target.children[0];
      let elInput = e.target.children[1];
      elInput.style.display = 'block'
      elText.style.display='none'
    }
  }
  /* 更新内容 */
  updateContext(e,index){
    let lists=[...this.state.studyLists];
    lists[index].title = e.target.value
    this.setState({
      studyLists:lists
    })
  }
  /* 回车事件 */
  keyDown(e,index){
    if(e.keyCode === 13){
      let lists=[...this.state.studyLists];
      lists[index].title = e.target.value
      this.setState({
        studyLists:lists
      })
      let elText = e.target.parentElement.children[0];
      elText.style.display = 'block'
      e.target.style.display='none'
    }
  }
  /* 添加新任务 */
  addItem(){
    let lists=[...this.state.studyLists];
    if(lists[lists.length-1].title ==='')
      return
    lists.push({title:'',type:'studyLists'});
    this.setState({
      studyLists:lists
    })
  }
  /* 任务开始拖拽 */
  dragStart(e,index){
    console.log(e.target);
    e.dataTransfer.setData('text',index);
    
  }
  /* 拖拽完成事件 */
  dragEnd(e,targetLists,index){
    let moduleDiv = document.querySelector('.module')
    /* 判定删除元素区域，即module板块以外即为删除元素 */
    if(!((e.pageY>=moduleDiv.offsetTop&&e.pageY<=moduleDiv.offsetHeight+moduleDiv.offsetTop) &&
      (e.pageX>=moduleDiv.offsetLeft&&e.pageX<=moduleDiv.offsetWidth+moduleDiv.offsetLeft))
    ){
      this.showDeleteConfirm(e,targetLists,index)
    }


  }
  /* 进入目标元素 */
  targetDragEnter(e){
    /* 去除默认行为 */
    e.target.ondragover = function(event){
      event.preventDefault()
    }
    /* 拖放事件处理 */
    e.target.ondrop = (event)=>{
      let index = event.dataTransfer.getData('text');
      let lists = [...this.state.studyLists]
      let lists2 = [...this.state.studyLists2]
      let lists3 = [...this.state.studyLists3]
      let item ={}
      if(!index)
        return
      if([...e.target.classList].indexOf('plate-learning') !== -1){
        item = {
          title:lists[index].title,
          type:'studyLists2'
        }
        lists2.push(item);
      }else{
        item = {
          title:lists[index].title,
          type:'studyLists3'
        }
        lists3.push(item);
      }
      
      lists.splice(index,1)
      this.setState({
        studyLists:lists,
        studyLists2:lists2,
        studyLists3:lists3,
      })
    }
  }
  targetDelete(e){
    e.preventDefault()
    /* 去除默认行为 */
    e.target.ondragover = function(event){
      event.preventDefault()
    }
  }
}

export default PageMain