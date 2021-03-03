import React, {Component} from 'react';
import {TreeListData} from "../../configs/constants";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const List = TreeListData.data

class TreeGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Department: [],
            Group: [],
            Categories: [],
            SubCategories: [],

        }
    }

    componentDidMount() {
        this.handleSortGroup()
    }

    handleSortGroup = () => {
        const Department = List.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.department_nm === thing.department_nm
            )),
        )
        this.setState({Department: Department})

    }

    OpenDepartment = () => {
        this.setState({Group: ''})
        const Group = List.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.group_nm === thing.group_nm
            )),
        )
        this.setState({Group: Group})
    }

    OpenCategory = (item) => {
        this.setState({GroupName :item})

        const Category = []
        for (let i of List) {
            if (i.group_nm === item) {
                Category.push(i)
            }
        }
        const Categor = Category.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.category_nm === thing.category_nm
            )),
        )

        this.setState({Categories: Categor})

    }

    OpenSubCategory = (item) => {
        const SubCategory = []
        for (let i of List) {
            if (i.category_nm === item) {
                SubCategory.push(i)
            }
        }
        const SubCategor = SubCategory.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.sub_cat_nm === thing.sub_cat_nm
            )),
        )
        this.setState({SubCategories: SubCategor})
    }


    render() {

        const {Department, Group, Categories, SubCategories} = this.state

        return (
            <div>

                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    multiSelect
                >
                    <hr style={{color: 'lightgray'}}/>

                    <div className={'ButtonsStyle'} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <button onClick={() => this.setState({Group: ''})}>Department</button>
                            /
                            <button onClick={() => this.setState({Group: ''})}>Group</button>
                            /
                            <button onClick={() => this.setState({Categories: ''})}>Category</button>
                            /
                            <button onClick={() => this.setState({SubCategories: ''})}>Sub-Category</button>
                        </div>

                        <div>Budgeted</div>
                    </div>


                    {Department.length ? Department.map((i) => (

                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            multiSelect
                        >


                        <div>
                            <hr style={{color: 'black', background: 'black'}}/>
                            <TreeItem onClick={this.OpenDepartment} nodeId={i.department_id} label={i.department_nm}>


                                {Group.length ? Group.map((j) => (
                                    <div>
                                        <hr/>
                                        <div className={'BudgetedStyle'}>
                                            <p> {j.current_group_am} </p>

                                            <TreeItem onClick={() => this.OpenCategory(j.group_nm)} nodeId={j.group_nm} label={`${j.group_nm}`}>

                                                { Categories.length ? Categories.map((o) => (
                                                   this.state.GroupName === o.group_nm &&
                                                    <div>
                                                        <hr/>
                                                        <div className={'BudgetedStyle'}>
                                                            <p> {o.current_cat_am} </p>
                                                            <TreeItem
                                                                onClick={() => this.OpenSubCategory(o.category_nm)}
                                                                nodeId={o.category_id} label={o.category_nm}>


                                                                {SubCategories.length ? SubCategories.map((q) => (
                                                                    <div>
                                                                        <hr/>
                                                                        <div className={'BudgetedStyle'}>
                                                                            <p> {q.current_sub_cat_am} </p>
                                                                            <TreeItem nodeId={q.sub_cat_id}
                                                                                      label={q.sub_cat_nm}/>
                                                                        </div>
                                                                    </div>
                                                                )) : <TreeItem/>}
                                                            </TreeItem></div>
                                                    </div>
                                                )) : <TreeItem/>}
                                            </TreeItem>
                                        </div>
                                    </div>)) : <TreeItem/>}
                            </TreeItem>
                        </div>
                        </TreeView> )) : <TreeItem/>}
                </TreeView>

            </div>
        );
    }
}

export default TreeGroupList;