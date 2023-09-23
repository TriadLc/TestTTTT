import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {


  render() {
    
    return (
       <div className="home-footer">
            <p>©Copyright: @2023 - noMan-in-castle. More Information from my channel.
                <a target="blank" href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjk_JFCBc0fT1PaChn9bqp9yi7Wwwqm7-ytUr6A3hTwWKc9IPQDpAjH-ZWxnHttC1-DBf-55DQ4_zZv8ZbmSFzZdO38DRU90_ke3jfDE0ZP6IU_YWE3G3on6dCnSWlT1OeQb6EA2cnDOzOwtVnAgArQvUDekwnnw_itSfB3KSqj2pv5gCgHWtYAVZ1kXw/w1200-h630-p-k-no-nu/may-nghi-do-la-link-a-nhung-do-la-le-hong-quang-phong-vien-dai-truyen-hinh-viet-nam-69ed70bbc4be062eb40de438417f6241.jpg"> &#8594;Click here&#8592;</a></p>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
