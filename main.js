// var currentURL = window.location.href;
var currentURL = window.location.hostname;
var statusPageId = document.getElementById('spike--status-page-info').value;

/**
 * add event listener to the newly created element
 */
function addEventListenersToElements(allmaintenances) {
    var spikeWrapper = document.getElementById('spike-toast--wrapper');
    spikeWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('spike-hide-toast')) {
            document.getElementById('spike-maintenance--toast').style.transform = 'translateX(-120%)';
        } else if (event.target.id === 'spike-seen-all') {
			var maintenancesSeen = allmaintenances.map(m => {
				return {
					seen: true,
					id: m._id,
					seen_at: new Date(),
					statusPageId,
					startsAt: m.identifiedAt,
					endsAt: m.RES_at,
				}
			})
			localStorage.setItem('maintenanceArray', JSON.stringify(maintenancesSeen))
		}
    })
}

/**
 * create a slider that will show the alert when the user is on the page
 * flow:
 * 1. create a div will id 'side-modal'
 * 2. add styling to the div
 * 3. add the div to the body
 * 4. add a new style sheet
 * 5. append the new style sheet to the head
 */
function createSlideAlert(maintenance, allmaintenances, slug, isPrivate, subdomain) {
    var sliderAlert = document.createElement('div');
    sliderAlert.id = 'side-modal';
    var style = document.createElement('style');
    document.head.appendChild(style);
    
    sliderAlert.innerHTML = `
    <div id="spike-toast--wrapper" style="position: absolute; bottom: 3em; left: 0; overflow: hidden;">
		<div class="spike-maintenance--toast" id="spike-maintenance--toast"
			style="padding: 1em; padding-top: 0.2em; margin: 1em; max-width: 20vw; border-radius: 6px; background-color: #fff; box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12); border: 1px solid #e5e5e5; transition: 1s; transform: translateX(-120%)">
			<div class="spike-toast--header"
				style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.7em">
				<div style="display: flex; padding: 0.2em; align-items: center;" class="spike-icon-and-title">
					<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 4.2C9 2.3 7.8 0.6 6 0V3.7H3V0C1.2 0.6 0 2.3 0 4.2C0 6.1 1.2 7.8 3 8.4V19.4C3 19.8 3.2 20 3.5 20H5.5C5.8 20 6 19.8 6 19.5V8.5C7.8 7.9 9 6.2 9 4.2ZM15 6C15 6 14.9 6 15 6C11.1 6.1 8 9.2 8 13C8 16.9 11.1 20 15 20C18.9 20 22 16.9 22 13C22 9.1 18.9 6 15 6ZM15 18C12.2 18 10 15.8 10 13C10 10.2 12.2 8 15 8C17.8 8 20 10.2 20 13C20 15.8 17.8 18 15 18ZM14 9V14L17.6 16.2L18.4 15L15.5 13.3V9H14Z" fill="#202020" fill-opacity="0.87"/>
					</svg>
				
					<h3 style="margin: 0.3em 0.3em;">
						Planned maintenance
					</h3>
				</div>
				<div class="spike-hide-toast" style="margin-bottom: 1em; cursor: pointer;">
					<svg class="spike-hide-toast" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" style="{{css}}"><path class='spike-hide-toast' d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
				</div>
			</div>
			<div id="spike-maintenance-content" style="padding-top: 0;">
				<p>Our website is going into planned maintenance from ${maintenance.identifiedAt} to ${maintenance.RES_at}</p>
				${allmaintenances.length > 1 ? `<p>${slug && !isPrivate ? `<a id="spike-seen-all" style="color: #007bff; text-decoration: none;" ${subdomain ? `href="https://${subdomain}"`: `href="https://statuspage.spike.sh/${slug}`}">+ ${allmaintenances.length - 1} ${allmaintenances.length - 1 === 1 ? `maintenance` : `maintenances`}</a> ` : ''}</p>` : ''}
				<div style="font-size: 0.8em; display: flex; align-items: center; justify-content: flex-end; margin-top: 1em;">
					<div style="color: #c4c4c4; opacity: 0.8; text-decoration: underline;">Powered by <b><a style="color: #c4c4c4" href="https://spike.sh" target="_blank">spike.sh</a></b>
						<svg width="16px" height="16px" viewBox="0 0 32 32" style="vertical-align: bottom; justify-self-end" fill="#242833" xmlns="http://www.w3.org/2000/svg">
						<rect width="32" height="32" rx="4" fill="#242833" fill-opacity="0.1"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7439 12.4817C15.7942 12.4817 15.0027 12.1698 14.3696 11.5462C13.759 10.9225 13.4538 10.1541 13.4538 9.24084C13.4538 8.32761 13.759 7.55917 14.3696 6.9355C15.0027 6.31183 15.7942 6 16.7439 6C17.671 6 18.4398 6.31183 19.0504 6.9355C19.6835 7.55917 20.0001 8.32761 20.0001 9.24084C20.0001 10.1541 19.6835 10.9225 19.0504 11.5462C18.4398 12.1698 17.671 12.4817 16.7439 12.4817ZM17.4034 14.9837C18.3766 15.1875 19.0866 15.7006 19.5334 16.5228C20.0023 17.3497 20.0981 18.4059 19.8208 19.6913C19.2756 22.2187 17.8829 24.2269 15.6429 25.7162C15.2406 25.9735 14.8183 26.0558 14.376 25.9632C13.9336 25.8706 13.5794 25.637 13.3135 25.2625C13.0428 24.9098 12.9474 24.5482 13.0273 24.1778C13.1025 23.8292 13.3144 23.5434 13.6631 23.3204C14.6111 22.6764 15.33 21.9161 15.8196 21.0395C14.9932 20.7981 14.371 20.3603 13.953 19.7263C13.5396 19.0704 13.4223 18.3285 13.6009 17.5006C13.7936 16.6073 14.2544 15.9182 14.9831 15.4332C15.7119 14.9483 16.5187 14.7984 17.4034 14.9837Z" fill="#fff"/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
    `;
    document.body.appendChild(sliderAlert);
    addEventListenersToElements(allmaintenances);

    setTimeout(() => {
        document.getElementById('spike-maintenance--toast').style.transform = 'translateX(0)';
    }, 1000)
}

//make ajax request to /:id/upcoming-maintenance
;(function getUpcomingMaintenance() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `https://statuspage.in.ngrok.io/status-page/${statusPageId}/upcoming-maintenance`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            // get all the upcomming maintenances
            var { upcomingmaintenances, slug, isPrivate, subdomain } = JSON.parse(this.responseText)
            // filter the array based on if the maintenance is to be shown to visitors or not
            upcomingmaintenances = upcomingmaintenances.filter(maintenance => maintenance.notifyVisitors)

            if (upcomingmaintenances.length > 0) { 

                //assume the current maintenance is already seen
                var upcomingMaintenance, notSeen = false
                // fetch all the previous seen maintenances from local storage or set it to an empty array (fallback)
                var maintenanceSeen = JSON.parse(localStorage.getItem('maintenanceArray')) || []

                for (var i = 0; i < upcomingmaintenances.length; i++) {
                    var currentmaintenance = upcomingmaintenances[i];
                    // check if the current maintenance is already seen and if it is, skip it
                    if (maintenanceSeen.find(maintenance => maintenance.id === currentmaintenance._id && maintenance.seen)) {
                        continue
                    } else {
                        notSeen = true
                        upcomingMaintenance = currentmaintenance
                        break
                    }
                }

                // if the current maintenance is not seen, create a toast and show it and after that store it in local storage
                if (notSeen) {
                    createSlideAlert(upcomingMaintenance, upcomingmaintenances, slug, isPrivate, subdomain);
                    maintenanceSeen.push({seen: true, id: upcomingMaintenance._id, seen_at: new Date(), statusPageId: statusPageId, startsAt: upcomingMaintenance.identifiedAt, endsAt: upcomingMaintenance.RES_at});
                    localStorage.setItem('maintenanceArray', JSON.stringify(maintenanceSeen));
                }
            }
        } else {
            console.log('error')
        }
    }

    var data = JSON.stringify({URL: currentURL, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    xhr.send(data);
})()