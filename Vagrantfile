# -*- mode: ruby -*-
# vi: set ft=ruby :
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "Debian750"
  config.vm.box_url = "https://dl.dropboxusercontent.com/s/tp5nupuw7dltg2u/debian-7.5.0-amd64-vmware.box"

  config.vm.provider "virtualbox" do |vb|
     vb.gui = false
     vb.customize ["modifyvm", :id, "--memory", "1024"]
   end
  
   config.vm.provision "chef_solo" do |chef|
   end

end
