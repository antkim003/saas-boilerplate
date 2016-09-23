<form>
  <FormGroup>
    <ControlLabel>Name</ControlLabel>
    <FormControl
      id="formName"
      type="text"
      label="Name"
      ref="name"
      placeholder={this.props.user.name}
    />
    <ControlLabel>Email</ControlLabel>
    <FormControl
      id="formEmail"
      type="text"
      label="Email"
      placeholder={this.props.user.email}
    />
  <ControlLabel>Password</ControlLabel>
    <FormControl
      id="formPassword"
      type="text"
      label="Password"
      placeholder="Enter new password"
    />
  <ControlLabel>User Type</ControlLabel>
    <FormControl
      id="formUserType"
      type="text"
      label="User Type"
      placeholder={this.props.user.usertype}
    />
  </FormGroup>
  <FormGroup controlId="formControlsSelect">
    <ControlLabel>Select</ControlLabel>
    <FormControl componentClass="select" placeholder="select">
      <option value="select">Admin</option>
      <option value="other">End User</option>
    </FormControl>
  </FormGroup>
</form>
