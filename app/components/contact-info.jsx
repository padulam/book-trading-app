export default class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {edit: false, 
                  firstName: this.props.user.firstName, 
                  lastName: this.props.user.lastName, 
                  address: this.props.user.address,
                  city: this.props.user.city,
                  state: this.props.user.state,
                  zip: this.props.user.zip};

    this._editContactInfo = this._editContactInfo.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _editContactInfo(e){
    if(this.state.edit){
      e.preventDefault();
      this.props.saveContactInfo(this.state);
    }

    this.setState({edit: !this.state.edit});
  }

  _handleChange(){
    this.setState({
      firstName: this._firstName.value,
      lastName: this._lastName.value,
      address: this._address.value,
      city: this._city.value,
      state: this._state.value,
      zip: this._zip.value
    })
  }

  render(){
    let disabled = false;
    let contactButtonTxt;

    if(!this.state.edit){
      contactButtonTxt = "Edit"
      disabled = true;
    }

    return(
      <div className="container contact-info-main">
        <div><h3>Contact Information <button className="btn btn-default" id="editContactInfo" onClick={this._editContactInfo}>{contactButtonTxt||"Save"}</button></h3></div>
        <div className="contact-info-data">
          <form method="post" className="form-horizontal">
            <div className="form-group">
              <label htmlFor="firstName" className="col-sm-2 control-label">First Name</label>
              <div className="col-sm-10">
                <input type="text" ref={v => this._firstName = v} onChange={this._handleChange} id="firstName" className="form-control" name="firstName" value={this.state.firstName} disabled={disabled}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="col-sm-2 control-label">Last Name</label>
              <div className="col-sm-10">
                <input type="text" ref={v => this._lastName = v} onChange={this._handleChange} id="lastName" className="form-control" name="lastName" value={this.state.lastName} disabled={disabled}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="col-sm-2 control-label">Address</label>
              <div className="col-sm-10">
                <input type="text" ref={v => this._address = v} onChange={this._handleChange} id="address" className="form-control" name="address" value={this.state.address} disabled={disabled}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="city" className="col-sm-2 control-label">City</label>
              <div className="col-sm-10">
                <input type="text" ref={v => this._city = v} onChange={this._handleChange} id="city" className="form-control" name="city" value={this.state.city} disabled={disabled}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="state" className="col-sm-2 control-label">State</label>
              <div className="col-sm-10">
                <input type="text" ref={v => this._state = v} onChange={this._handleChange} id="state" className="form-control" name="state" value={this.state.state} disabled={disabled}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="zip" className="col-sm-2 control-label">Zip</label>
              <div className="col-sm-10">
                <input type="text" ref={v => this._zip = v} onChange={this._handleChange} id="zip" className="form-control" name="zip" value={this.state.zip} disabled={disabled}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}