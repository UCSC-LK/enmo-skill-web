document.getElementById("order").addEventListener("click", function(){
    document.getElementById("overlay").style.display = "block";
})

document.getElementById("overlay").addEventListener("click", function(){
    document.getElementById("overlay").style.display = "none";
})

var unh = document.getElementById("unhandled")
var acc = document.getElementById("accepted")
var rej = document.getElementById("rejected")

// document.addEventListener("DOMContentLoaded", function(){
//     unh.className = "active"
// })

// unh.addEventListener("click", function(){
//     unh.className = "active"
//     acc.classList.remove("active")
//     rej.classList.remove("active")
// })
// acc.addEventListener("click", function(){
//     acc.className = "active";
//     unh.classList.remove("active");
//     rej.classList.remove("active");
// })
// rej.addEventListener("click", function(){
//     rej.className = "active";
//     unh.classList.remove("active");
//     acc.classList.remove("active");
// })

var refund_req = [
    {
      "id": "12345",
      "requester": "235",
      "reason": "ABCDGGGG ggggggg jjdhhdhdhdhd ggddffdf nhhdhd jjshsg shhdgd sshghs shhshgs"
    },
    {
      "id": "67890",
      "requester": "567",
      "reason": "EFGHHHH hhhhhhh kkekekekeke kkggjjgg nkkkkk kkllll kkjjjj kkkkkk"
    },
    {
      "id": "13579",
      "requester": "789",
      "reason": "IJKLIIII iiiiiii lllllll llddddd llkkkdd lllldd llllll llllll"
    },
    {
      "id": "24680",
      "requester": "012",
      "reason": "MNOOMMM mmmmmmm nnnnnnn nnnnnnn nnnnnnn ooooonn ooooon oooooo"
    },
    {
      "id": "54321",
      "requester": "345",
      "reason": "PQRSTTT ttttttt ttttttt ttttttt ttttttt tttttt ttttt ttttt"
    }
  ]

  var orders = [
    {
      "Client": "145 - Joe A.",
      "Designer": "234 - Anne S.",
      "Requirements": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      "Created Date": "2023-10-08",
      "Accepted Date": "2023-10-10",
      "Status": "Ongoing"
    },
    {
      "Client": "567 - Mary B.",
      "Designer": "789 - John D.",
      "Requirements": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      "Created Date": "2023-09-15",
      "Accepted Date": "2023-09-18",
      "Status": "Completed"
    },
    {
      "Client": "123 - Sarah C.",
      "Designer": "456 - David E.",
      "Requirements": "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      "Created Date": "2023-11-01",
      "Accepted Date": "2023-11-05",
      "Status": "Pending"
    },
    {
      "Client": "890 - Michael F.",
      "Designer": "678 - Emily G.",
      "Requirements": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      "Created Date": "2023-10-20",
      "Accepted Date": "2023-10-25",
      "Status": "Ongoing"
    },
    {
      "Client": "234 - Alex H.",
      "Designer": "345 - Olivia I.",
      "Requirements": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      "Created Date": "2023-11-08",
      "Accepted Date": "2023-11-12",
      "Status": "Ongoing"
    }
  ]
  
  
  document.addEventListener("DOMContentLoaded", loadRequests);

  function loadRequests(){
    var content = document.getElementById("content");
    unh.className = "active"
    acc.classList.remove("active")
    rej.classList.remove("active")

    content.innerHTML = "";

    refund_req.forEach(element => {
        
        // create rows
        var row = document.createElement("div");
        var p_id = document.createElement("p");
        var p_requester = document.createElement("p");
        var p_reason = document.createElement("p");
        var p_order = document.createElement("p");
        var btn = document.createElement("button");
        var pannel = document.createElement("div");
        var div_accept = document.createElement("div");
        var div_reject = document.createElement("div");

        //set classes
        row.className = "row";
        p_id.className = "id";
        p_requester.className = "requester";
        p_reason.className = "reason";
        p_order.className = "order";
        div_accept.className = "accept";
        div_reject.className = "reject";
        btn.className = "view-order";
        pannel.className = "pannel"

        // set innerhtmls
        p_id.innerHTML = element.id;
        p_requester.innerHTML = element.requester;
        p_reason.innerHTML = element.reason;
        btn.innerHTML = "View Order";
        div_accept.innerHTML = "Accept";
        div_reject.innerHTML = "Reject";

        //addeventlisters
        btn.addEventListener("click", function(){
            viewOrder(element)
        })

        //append
        row.appendChild(p_id);
        row.appendChild(p_requester);
        row.appendChild(p_reason);
        p_order.appendChild(btn);
        row.appendChild(p_order);
        pannel.appendChild(div_accept);
        pannel.appendChild(div_reject);
        row.appendChild(pannel);

        content.appendChild(row)
    });
  }

  unh.addEventListener("click", function(){
    loadRequests();
  })

  function viewOrder(ele){
    var overlay = document.getElementById("overlay");

    //create elements
    var div_main = document.createElement("div");
    var div_header = document.createElement("div");
    var div_bottom = document.createElement("div");

    div_main.className = "main-view";
    div_header.className = "header-view";
    div_bottom.className = "contain-bottom";

    //create header
    var p_title = document.createElement("p");
    var span_title = document.createElement("span");
    var p_close = document.createElement("p");

    p_title.className = "usename-top";
    span_title.className = "name-user";
    p_close.className = "close-top";

    span_title.innerHTML = ele.id;
    p_title.innerHTML = "ORDER - ";
    p_close.innerHTML = "X";

    p_title.appendChild(span_title);
    div_header.appendChild(p_title);
    div_header.appendChild(p_close);

    div_main.appendChild(div_header);
   

    //create body

    var l_client = document.createElement("label");
    var l_designer = document.createElement("label");
    var l_requirements = document.createElement("label");
    var l_created_date = document.createElement("label");
    var l_accepted_date = document.createElement("label");
    var l_status = document.createElement("label");

    var labels = [l_client, l_designer, l_requirements, l_created_date, l_accepted_date, l_status];
    
    var p_client = document.createElement("label");
    var p_designer = document.createElement("label");
    var p_requirements = document.createElement("label");
    var p_created_date = document.createElement("label");
    var p_accepted_date = document.createElement("label");
    var p_status = document.createElement("label");

    var data = [p_client, p_designer, p_requirements, p_created_date, p_accepted_date, p_status];

    var label_list = ["Client", "Designer", "Requirements", "Created Date", "Accepted Date", "Status"];

    for (let i = 0; i < labels.length; i++) {
        labels[i].className = "tl";
        data[i].className = "data";

        labels[i].innerHTML = label_list[i];
        
    }

    p_client.innerHTML

    overlay.style.display = "block";
  }
