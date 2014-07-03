# -*- mode: ruby -*-
# vi: set ft=ruby :
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "Debian750"
    config.vm.box_url = "debian-7.5.0-amd64-vmware.box"

    config.vm.network "forwarded_port", guest: 8086, host: 8086
    config.vm.synced_folder "app", "/app"

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
        chef.add_recipe "mongodb::10gen_repo"
        chef.add_recipe "nodejs"
    end
end
