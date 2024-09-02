import React from 'react'

function VIdeoCall() {
  return (
    <>
        <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      {/* <Header /> */}
      {/* Header End */}
      <section className="tk-main-section">
       <div class="page-wrapper">
            <div class="chat-main-row">
                <div class="chat-main-wrapper">
                    <div class="col-lg-9 message-view chat-view">
                        <div class="chat-window">
                            <div class="fixed-header">
								<div class="navbar">
                                    <div class="user-details mr-auto">
                                        <div class="float-left user-img m-r-10">
                                            <a href="profile.html" title="Mike Litorus"><img src="https://images.pexels.com/photos/4148984/pexels-photo-4148984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" class="w-40 rounded-circle" /><span class="status online"></span></a>
                                        </div>
                                        <div class="user-info float-left">
                                            <a href="profile.html" title="Mike Litorus"><span class="font-bold">Mike Litorus</span></a>
                                            <span class="last-seen">Online</span>
                                        </div>
                                    </div>
                                    <ul class="nav custom-menu">
                                        <li class="nav-item">
                                            <a class="task-chat profile-rightbar float-right" href="#chat_sidebar" id="task_chat"><i aria-hidden="true" class="fa fa-comments"></i></a>
                                        </li>
                                        <li class="nav-item dropdown dropdown-action">
                                            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-cog"></i></a>
											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item">Settings</a>
											</div>
                                        </li>
                                    </ul>
								</div>
                            </div>
                            <div class="chat-contents">
                                <div class="chat-content-wrap">
                                    <div class="user-video">
                                        <img src="https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                                    </div>
                                    <div class="my-video">
                                        <ul>
                                            <li>
                                                <img src="https://images.pexels.com/photos/4148984/pexels-photo-4148984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="img-fluid" alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-footer">
                                <div class="call-icons">
                                    <span class="call-duration">00:59</span>
                                    <ul class="call-items">
                                        <li class="call-item">
                                            <a href="" title="Enable Video" data-placement="top" data-toggle="tooltip">
                                                <i class="fa fa-video-camera camera"></i>
                                            </a>
                                        </li>
                                        <li class="call-item">
                                            <a href="" title="Mute Audio" data-placement="top" data-toggle="tooltip">
                                                <i class="fa fa-microphone microphone"></i>
                                            </a>
                                        </li>
                                        <li class="call-item">
                                            <a href="" title="Add User" data-placement="top" data-toggle="tooltip">
                                                <i class="fa fa-user-plus"></i>
                                            </a>
                                        </li>
                                        <li class="call-item">
                                            <a href="" title="Full Screen" data-placement="top" data-toggle="tooltip">
                                                <i class="fa fa-arrows-v full-screen"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="end-call">
                                        <a href="">
												End Call
											</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </div>
        </section>

        {/* <Footer /> */}
        </div>
    </>
  )
}

export default VIdeoCall