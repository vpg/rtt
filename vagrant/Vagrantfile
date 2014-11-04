# -*- mode: ruby -*-
# vi: set ft=ruby :
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "Debian720"
    config.vm.box_url = "debian-7.2.0.box"

    config.vm.network "forwarded_port", guest: 8086, host: 8086
    config.vm.network "private_network", ip: '192.168.20.20'
    config.vm.synced_folder "server", "/rtt/server"
    config.vm.synced_folder "src", "/rtt/src"
    config.vm.synced_folder "web", "/rtt/web"

   #config.vm.provider "vmware_workstation" do |v|
   #    v.gui = false
   #end

    config.vm.provider "virtualbox" do |vb|
        vb.gui = false
        vb.customize ["modifyvm", :id, "--memory", "1024"]
    end
  
    config.vm.provision "chef_solo" do |chef|
        chef.cookbooks_path = "cookbooks"
        chef.json = {
            "nodejs" => {
                "version" => "0.10.23"
            }
        }
        chef.add_recipe "apt"
        chef.add_recipe "build-essential"
        chef.add_recipe "chef-dotdeb"
        chef.add_recipe "composer"
        chef.add_recipe "apache2"
        chef.add_recipe "apache2::mod_php5"
        chef.add_recipe "apache2::mod_rewrite"
        chef.add_recipe "apache2::vhost"
        chef.add_recipe "mongodb::10gen_repo"
        chef.add_recipe "nodejs"
    end
end
