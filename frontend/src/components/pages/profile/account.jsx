import React from 'react'

import {ProfileUpdater, Step} from 'components/pages/profile/step'
import {Colors, FieldSet, Input} from 'components/theme'


// TODO: Fix the padding when viewed mobile on 360x640 - http://screenshot.co/#!/bb84ec39a5
class AccountStep extends React.Component {
  componentWillMount() {
    this.updater_ = new ProfileUpdater(
      {
        email: true,
        lastName: true,
        name: true,
      },
      this,
      this.props,
    )
  }

  render() {
    const {email, isValidated, lastName, name} = this.state
    return <Step
      title="Vos informations"
      fastForward={this.updater_.handleSubmit}
      onNextButtonClick={this.updater_.handleSubmit}
      {...this.props}>
      <FieldSet label="Prénom" isValid={!!name} isValidated={isValidated}>
        <Input
          type="text" placeholder="Prénom"
          onChange={this.updater_.handleChange('name')} value={name} />
      </FieldSet>
      <FieldSet label="Nom" isValid={!!lastName} isValidated={isValidated}>
        <Input
          type="text" placeholder="Nom"
          onChange={this.updater_.handleChange('lastName')} value={lastName} />
      </FieldSet>
      <FieldSet
        label="Email (non éditable pour l'instant)"
        isValid={!!email} isValidated={isValidated}>
        <Input
          type="text" style={{color: Colors.COOL_GREY}}
          value={email} readOnly={true} />
      </FieldSet>
    </Step>
  }
}


export {AccountStep}
