Vue.component('todo-item', {
    props : [ 'todo' ],
    template:`<li >{{ todo.text }}
        <button type="button" v-on:click="$emit('complete', todo.id)">Complete</button></li>`
});

Vue.component('custom-input', {
    props: ['value'],
    template: `
      <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    `
  })


var app = new Vue({
    el: '#app', 
    data : function () {
        return {
            taskAddItem : '',
            list : [],
            errorSpan : false,
            messageError : ''
        }
    },
    methods : {
        addTask : function() {
            if (this.taskAddItem.trim().length === 0) {
                this.errorSpan = true;
                this.messageError = 'Debe estar lleno';
                return false;
            }
            let textTask = this.taskAddItem.trim();
            this.errorSpan = false;
            this.messageError = '';

            this.$http.post('http://localhost:3000/api/v0/tasks',
                {
                    text : textTask, status : 'created'
                }
            ).then(function (response) {
                //console.log(this.list);
                //console.log(response.data.data);
                this.list.push(response.data.data);
                //console.log(this.list);
                this.clearTaskForm();
            }).catch(error => console.log(error));
            
        },
        clearTaskForm : function () {
            this.taskAddItem = '';
        },
        showError : function (todo_item) {
            
        },
        completeTodo (idToComplete) {
            //make status completed to api using axios
            this.$http.patch('http://localhost:3000/api/v0/tasks/' + idToComplete + '/complete')
                .then(function (response) {
                    console.log(response);
                    this.list = this.list.filter(todo => {
                        return todo.id !== idToComplete
                    });
                }).catch(error => console.log(error));
		}
    },
    computed : {

    },
    mounted () {
        let self = this;
        //get all task to api using axios
        /*fetch('http://localhost:3000/api/v0/tasks')
            .then(function (response) {
                self.list = response.body.data
           }).catch(error => console.log(error));*/
        this.$http.get('http://localhost:3000/api/v0/tasks').then(function (response) {
                 this.list = response.body.data
            }).catch(error => console.log(error));
    }
  })