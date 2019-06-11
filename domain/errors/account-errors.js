import { CustomErr } from './customError';

function LoginErr(code, message) {
  return new CustomErr({
    context: 'login',
    code,
    message,
  });
}

function NotVerificatedLoginErr() {
  return LoginErr('NOCODE', 'You can´t login until you verify your account. A new verification code was sent to your email.');
}

function MaxAttemptsLoginErr(unbanDate) {
  return LoginErr('MAXPWD', `Reached limit login attempts. Account blocked until ${unbanDate}`);
}

function BadPasswordErr(attemptLeft) {
  return new CustomErr({
    context: 'login',
    code: 'BADPWD',
    message: `Invalid password. You have ${attemptLeft} attempts before your account is suspended.`,
  });
}

function UserIsBannedErr(unbanDate) {
  return new CustomErr({
    context: 'login',
    code: 'USERBAN',
    message: `Account is blocked until ${unbanDate}`,
  });
}

// ACCOUNT CREATION
function EmailInUseErr() {
  return new CustomErr({
    context: 'register',
    code: 'EMAIL',
    message: 'Did we met before...? This e-mail is already in use!',
  });
}

// CODE
function DeletedCodeErr() {
  return new CustomErr({
    context: 'activation',
    code: 'DELETED',
    message: 'The verification code you are trying to use no longer exists.'
  });
}
function ExpiredCodeErr() {
  return new CustomErr({
    context: 'activation',
    code: 'EXPIRED',
    message: 'The verification code has expired. A new code was sent to your email.'
  });
}

export {
  BadPasswordErr,
  DeletedCodeErr,
  EmailInUseErr,
  ExpiredCodeErr,
  LoginErr,
  NotVerificatedLoginErr,
  MaxAttemptsLoginErr,
  UserIsBannedErr,
};
